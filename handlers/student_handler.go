package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/services"
	"github.com/karnerfly/quiz/store"
)

type StudentHandler struct {
	service *services.StudentService
	config  configs.Config
}

func NewStudentHandler(studentService *services.StudentService, cfg configs.Config) *StudentHandler {
	return &StudentHandler{service: studentService, config: cfg}
}

func (sh *StudentHandler) HandleStartQuiz(ctx *gin.Context) {
	var (
		env     = sh.config.Environment
		payload dto.StartQuizPayload
	)
	session := sessions.DefaultMany(ctx, store.StartQuizSession)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	session.Set("payload", payload)
	session.Options(sessions.Options{
		Path:     "/",
		Domain:   sh.config.SubmissionSessionCookie.Domain,
		MaxAge:   sh.config.SubmissionSessionCookie.MaxAge,
		Secure:   sh.config.Environment == "production",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})
	if err := session.Save(); err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "quiz start session activated",
		Data:    payload,
	}
	SendResponse(ctx, http.StatusCreated, resp)
}

func (sh *StudentHandler) HandleSubmitQuiz(ctx *gin.Context) {
	var (
		payload struct {
			Answers []dto.QuizAnswerPayload
		}
		env = sh.config.Environment
	)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	session := sessions.DefaultMany(ctx, store.StartQuizSession)
	submissionBasicDetails, ok := session.Get("payload").(dto.StartQuizPayload)

	if !ok {
		SendBadRequestError(ctx, "invalid start quiz session", "invalid start quiz session", env)
		return
	}

	submission := dto.QuizSubmitPayload{
		Name:     submissionBasicDetails.Name,
		Phone:    submissionBasicDetails.Phone,
		District: submissionBasicDetails.District,
		QuizCode: submissionBasicDetails.QuizCode,
		Answers:  payload.Answers,
	}

	submissionCode, err := sh.service.CreateNewSubmission(ctx.Request.Context(), submission)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendBadRequestError(ctx, "quiz does not exists", "the quiz with given id doest has expired or does not exists", env)
			return
		}
		SendInternalServerError(ctx, err, env)
		return
	}
	session.Set("submission_code", submissionCode)
	if err := session.Save(); err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "submission created successfully",
		Data: map[string]any{
			"submission_code": submissionCode,
		},
	}

	SendResponse(ctx, http.StatusCreated, resp)
}

func (sh *StudentHandler) HandleGetResultBySubmissionCode(ctx *gin.Context) {
	var (
		env = sh.config.Environment
	)
	session := sessions.DefaultMany(ctx, store.StartQuizSession)
	submissionCode, ok := session.Get("submission_code").(string)

	if !ok {
		SendBadRequestError(ctx, "start quiz session missing", "start quiz session either expired or has not initialize yet", env)
		return
	}

	submission, err := sh.service.GetSubmissionByCode(ctx.Request.Context(), submissionCode)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendBadRequestError(ctx, "failed to fetch result", "invalid submission code", env)
			return
		}

		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "submission fetched successfully",
		Data:    submission,
	}

	SendResponse(ctx, http.StatusOK, resp)
}

func (sh *StudentHandler) HandleGetStudentDetails(ctx *gin.Context) {
	env := sh.config.Environment
	session := sessions.DefaultMany(ctx, store.StartQuizSession)
	payload := session.Get("payload")

	if payload == nil {
		SendResourceNotFoundError(ctx, "start quiz session missing", "start quiz session either expired or has not initialize yet", env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "user details fetched successfully",
		Data:    payload,
	}
	SendResponse(ctx, http.StatusOK, resp)
}
