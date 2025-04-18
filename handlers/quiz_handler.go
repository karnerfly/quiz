package handlers

import (
	"encoding/gob"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/services"
)

type QuizHandler struct {
	service *services.QuizService
	config  configs.Config
}

func init() {
	gob.Register([]models.AddQuestionPayload{})
}

func NewQuizHandler(quizService *services.QuizService, cfg configs.Config) *QuizHandler {
	return &QuizHandler{service: quizService, config: cfg}
}

func (qh *QuizHandler) HandleCreateQuiz(ctx *gin.Context) {
	hostId, exists := ctx.Get("userId")
	if !exists {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: "userId is missing in request context",
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(qh.config.Environment))
		return
	}

	nHostId := hostId.(uint)

	var payload models.CreateQuizPayload
	err := ValidateJsonPayload(ctx, &payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(qh.config.Environment))
		return
	}

	v := validator.New()

	err = v.Struct(payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(qh.config.Environment))
		return
	}

	quizId, err := qh.service.CreateNewQuiz(ctx.Request.Context(), nHostId, payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong while creating user",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(qh.config.Environment))
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "new quiz created successfully",
		Data: map[string]any{
			"quiz_id": quizId,
		},
	}
	SendResponse(ctx, http.StatusCreated, resp)
}

func (qh *QuizHandler) HandleAddQuestion(ctx *gin.Context) {
	quizId := ctx.Param("quizId")

	nQuizId, err := strconv.Atoi(quizId)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid quizId",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(qh.config.Environment))
		return
	}

	hostId, exists := ctx.Get("userId")
	if !exists {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: "userId is missing in request context",
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(qh.config.Environment))
		return
	}

	nHostId := hostId.(uint)

	var payload models.AddQuestionPayload

	err = ValidateJsonPayload(ctx, &payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(qh.config.Environment))
		return
	}

	v := validator.New()
	err = v.Struct(payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(qh.config.Environment))
		return
	}

	questionId, err := qh.service.AddQuestion(ctx, uint(nQuizId), nHostId, payload)
	if err != nil {
		errCode := http.StatusInternalServerError
		if errors.Is(err, constants.ErrMaxNumberExceed) {
			errCode = http.StatusBadRequest
		}
		errResp := ErrorResponse{
			Code:        errCode,
			Message:     "something went wrong while add question",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, errCode, errResp, PrintStack(qh.config.Environment))
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "new question added to the quiz",
		Data: map[string]any{
			"quiz_id":     quizId,
			"question_id": questionId,
		},
	}
	SendResponse(ctx, http.StatusCreated, resp)
}

func (qh *QuizHandler) HandleFinishQuiz(ctx *gin.Context) {}

func (qh *QuizHandler) HandleGetAllQuizzes(ctx *gin.Context) {
	hostId, exists := ctx.Get("userId")
	if !exists {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: "userId is missing in request context",
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(qh.config.Environment))
		return
	}

	nhostId := hostId.(uint)

	quizzes, err := qh.service.GetAllQuizzes(ctx.Request.Context(), nhostId)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong while fetching quizzes",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(qh.config.Environment))
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "quizzes fetched successfully",
		Data:    quizzes,
	}
	SendResponse(ctx, http.StatusOK, resp)
}
