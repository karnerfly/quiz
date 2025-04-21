package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/services"
)

type StudentHandler struct {
	service *services.StudentService
	config  configs.Config
}

func NewStudentHandler(studentService *services.StudentService, cfg configs.Config) *StudentHandler {
	return &StudentHandler{service: studentService, config: cfg}
}

func (sh *StudentHandler) HandleStartQuiz(ctx *gin.Context) {

}

func (sh *StudentHandler) HandleSubmitQuiz(ctx *gin.Context) {
	var (
		payload dto.QuizSubmitPayload
		env     = sh.config.Environment
	)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	submissionCode, err := sh.service.CreateNewSubmission(ctx.Request.Context(), payload)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendBadRequestError(ctx, "quiz does not exists", "the quiz with given id doest has expired or does not exists", env)
			return
		}
		SendInternalServerError(ctx, err, env)
		return
	}

	ctx.SetCookie("QID", submissionCode, 2592000, "/", "", sh.config.Environment == "production", true)

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "submission created successfully",
		Data: map[string]any{
			"submission_code": submissionCode,
		},
	}

	SendResponse(ctx, http.StatusCreated, resp)
}

func (sh *StudentHandler) HandleGetResult(ctx *gin.Context) {
	env := sh.config.Environment
	queryQId := ctx.Query("qid")

	if queryQId == "" {
		SendBadRequestError(ctx, "failed to fetch result", "qid required in query", env)
		return
	}

	qId, err := ctx.Cookie("QID")
	if err != nil {
		SendBadRequestError(ctx, "failed to fetch result", "cookie is missing", env)
		return
	}

	if queryQId != qId {
		SendBadRequestError(ctx, "failed to fetch result", "invalid qid or session has expired", env)
		return
	}

	submission, err := sh.service.GetSubmissionByCode(ctx.Request.Context(), queryQId)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendBadRequestError(ctx, "failed to fetch result", "invalid quiz id", env)
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
