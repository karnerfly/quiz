package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/services"
	"github.com/karnerfly/quiz/store"
)

type TeacherHandler struct {
	service *services.TeacherService
	config  configs.Config
}

func NewTeacherHandler(userService *services.TeacherService, cfg configs.Config) *TeacherHandler {
	return &TeacherHandler{service: userService, config: cfg}
}

func (handler *TeacherHandler) HandleCreateTeacherAccount(ctx *gin.Context) {
	// validate user payload
	var (
		payload dto.CreateTeacherPayload
		env     = handler.config.Environment
	)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	// create user with given payload
	id, err := handler.service.CreateNewTeacher(ctx.Request.Context(), payload)

	// handler dfferent errors
	if err != nil {
		if errors.Is(err, constants.ErrRecordAlreadyExists) {
			SendBadRequestError(ctx, "user registration failed", "user already exists", env)
			return
		}
		SendInternalServerError(ctx, err, env)
		return
	}

	// create user session
	session := sessions.DefaultMany(ctx, store.UserSession)

	authToken, err := pkg.GenerateBase64Token(32)
	if err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	session.Set("user_id", id)
	session.Set("auth_token", authToken)

	if err = session.Save(); err != nil {
		SendInternalServerError(ctx, err, env)
		return
	}

	// send response back to the client
	resp := SuccessResponse{
		Code:    http.StatusCreated,
		Message: "user created successfully",
		Data: map[string]any{
			"auth_token": authToken,
		},
	}
	SendResponse(ctx, http.StatusCreated, resp)
}

func (handler *TeacherHandler) HandleGetTeacherDetails(ctx *gin.Context) {
	env := handler.config.Environment

	userId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nUserId := userId.(uint)

	userResp, err := handler.service.GetCurrentTeacher(ctx.Request.Context(), nUserId)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			SendResourceNotFoundError(ctx, "user details fetch error", "user does not exists", env)
			return
		}

		SendInternalServerError(ctx, err, env)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "user fetched successfully",
		Data: map[string]any{
			"user": userResp,
		},
	}
	SendResponse(ctx, http.StatusOK, resp)
}

func (handler *TeacherHandler) HandleGetAllQuizzes(ctx *gin.Context) {
	env := handler.config.Environment

	teacherId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nTeacherId := teacherId.(uint)

	quizzes, err := handler.service.GetAllQuizzesByTeacherId(ctx.Request.Context(), nTeacherId)
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

func (qh *TeacherHandler) HandleGetAllSubmissions(ctx *gin.Context) {
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

	submissions, err := qh.service.GetAllSubmissionsByTeacherId(ctx.Request.Context(), uint(nQuizId), nTeacherId)
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
