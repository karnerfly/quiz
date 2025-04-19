package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/services"
)

type StudentHandler struct {
	service *services.QuizService
	config  configs.Config
}

func NewStudentHandler(quizService *services.QuizService, cfg configs.Config) *StudentHandler {
	return &StudentHandler{service: quizService, config: cfg}
}

func (sh *StudentHandler) HandleStartQuiz(ctx *gin.Context) {

}

func (sh *StudentHandler) HandleGetResult(ctx *gin.Context) {
	env := sh.config.Environment
	querySessionId := ctx.Query("sid")

	if querySessionId == "" {
		SendBadRequestError(ctx, "failed to fetch result", "sid required in query", env)
		return
	}

	session := sessions.Default(ctx)
	sessionId := session.ID()

	if querySessionId != sessionId {
		SendBadRequestError(ctx, "failed to fetch result", "user has no active session", env)
		return
	}

	submission, err := sh.service.GetSubmissionBySessionId(ctx.Request.Context(), sessionId)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendBadRequestError(ctx, "failed to fetch result", "invalid session id", env)
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
