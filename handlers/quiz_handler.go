package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/services"
)

type QuizHandler struct {
	service *services.QuizService
	config  configs.Config
}

func NewQuizHandler(quizService *services.QuizService, cfg configs.Config) *QuizHandler {
	return &QuizHandler{service: quizService, config: cfg}
}

func (qh *QuizHandler) HandleCreateQuiz(ctx *gin.Context) {
	var (
		payload dto.CreateQuizPayload
		env     = qh.config.Environment
	)

	teacherId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nTeacherId := teacherId.(uint)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	if payload.NoOfQuestions != len(payload.Questions) {
		SendBadRequestError(ctx, "invalid json payload", "insufficient question lists", env)
		return
	}

	shareCode, err := qh.service.CreateNewQuiz(ctx.Request.Context(), nTeacherId, payload)
	if err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "new quiz created successfully",
		Data: map[string]any{
			"share_code": shareCode,
		},
	}
	SendResponse(ctx, http.StatusCreated, resp)
}

func (qh *QuizHandler) HandleGetAllQuizzes(ctx *gin.Context) {
	env := qh.config.Environment

	teacherId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nTeacherId := teacherId.(uint)

	quizzes, err := qh.service.GetAllQuizzesByTeacherId(ctx.Request.Context(), nTeacherId)
	if err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "quizzes fetched successfully",
		Data:    quizzes,
	}
	SendResponse(ctx, http.StatusOK, resp)
}

func (qh *QuizHandler) HandleGetAllSubmissions(ctx *gin.Context) {
	var (
		env    = qh.config.Environment
		quizId = ctx.Param("quizId")
	)

	teacherId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nTeacherId := teacherId.(uint)
	nQuizId, err := strconv.Atoi(quizId)
	if err != nil {
		SendBadRequestError(ctx, "invalid quiz id", "quizId is not a key id", env)
		return
	}

	submissions, err := qh.service.GetAllSubmissions(ctx.Request.Context(), uint(nQuizId), nTeacherId)
	if err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "submission fetched successfully",
		Data:    submissions,
	}

	SendResponse(ctx, http.StatusOK, resp)
}
