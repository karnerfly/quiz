package handlers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
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

func (qh *QuizHandler) HandleGetQuizByCode(ctx *gin.Context) {
	env := qh.config.Environment
	quizCode := ctx.Query("code")

	if quizCode == "" {
		SendBadRequestError(ctx, "invalid parameter", "quiz code is missing in query parameter", env)
		return
	}
	quiz, err := qh.service.GetQuizByCode(ctx.Request.Context(), quizCode)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendResourceNotFoundError(ctx, "quiz does not exists", "invalid quiz code", env)
			return
		}
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "quiz fetched successfully",
		Data:    quiz,
	}

	SendResponse(ctx, http.StatusOK, resp)
}
