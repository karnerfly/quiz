package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/services"
)

type UserHandler struct {
	service *services.UserService
	config  configs.Config
}

func NewUserHandler(userService *services.UserService, cfg configs.Config) *UserHandler {
	return &UserHandler{service: userService, config: cfg}
}

func (uh *UserHandler) HandleCreateUser(ctx *gin.Context) {
	// validate user payload
	var payload models.CreateUserPayload

	err := ValidateJsonPayload(ctx, &payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(uh.config.Environment))
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
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(uh.config.Environment))
		return
	}

	// create user with given payload
	id, err := uh.service.CreateUser(ctx.Request.Context(), payload)

	// handler dfferent errors
	if err != nil {
		errCode := http.StatusInternalServerError
		if errors.Is(err, constants.ErrRecordAlreadyExists) {
			errCode = http.StatusBadRequest
		}
		errResp := ErrorResponse{
			Code:        errCode,
			Message:     "something went wrong while creating user",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, errCode, errResp, PrintStack(uh.config.Environment))
		return
	}

	// create user session
	session := sessions.Default(ctx)

	authToken, err := pkg.GenerateAuthToken(32)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "cannot create authentication token",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(uh.config.Environment))
		return
	}

	session.Set("user_id", id)
	session.Set("auth_token", authToken)
	err = session.Save()
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "cannot create user session",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(uh.config.Environment))
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
	userId, exists := ctx.Get("userId")
	if !exists {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: "userId is missing in request context",
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(uh.config.Environment))
		return
	}

	nUserId, ok := userId.(uint)
	if !ok {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: "invalid userId in request context",
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(uh.config.Environment))
		return
	}

	userResp, err := uh.service.GetCurrentUser(ctx.Request.Context(), nUserId)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "something went wrong",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(uh.config.Environment))
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

func (uh *UserHandler) HandleGetAuthToken(ctx *gin.Context) {
	session := sessions.Default(ctx)

	authToken := session.Get("auth_token")

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "token fetched",
		Data: map[string]any{
			"auth_token": authToken,
		},
	}
	SendResponse(ctx, http.StatusOK, resp)
}
