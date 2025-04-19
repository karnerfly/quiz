package handlers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/services"
)

type UserHandler struct {
	service *services.UserService
	config  configs.Config
}

func NewTeacherHandler(userService *services.UserService, cfg configs.Config) *UserHandler {
	return &UserHandler{service: userService, config: cfg}
}

func (uh *UserHandler) HandleCreateTeacherAccount(ctx *gin.Context) {
	// validate user payload
	var (
		payload dto.CreateTeacherPayload
		env     = uh.config.Environment
	)

	if err := ValidateJsonPayload(ctx, &payload); err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	// create user with given payload
	id, err := uh.service.CreateNewTeacher(ctx.Request.Context(), payload)

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
	session := sessions.Default(ctx)

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

func (uh *UserHandler) HandleGetMe(ctx *gin.Context) {
	env := uh.config.Environment

	userId, exists := ctx.Get("userId")
	if !exists {
		SendInternalServerError(ctx, fmt.Errorf("context serialization failed"), env)
		return
	}

	nUserId := userId.(uint)

	userResp, err := uh.service.GetCurrentTeacher(ctx.Request.Context(), nUserId)
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
