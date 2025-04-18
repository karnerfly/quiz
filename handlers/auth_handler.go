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

type AuthHandler struct {
	service *services.AuthService
	config  configs.Config
}

func NewAuthHandler(authService *services.AuthService, cfg configs.Config) *AuthHandler {
	return &AuthHandler{service: authService, config: cfg}
}

func (ah *AuthHandler) HandleLoginUser(ctx *gin.Context) {
	// validate request payload
	var payload models.LoginUserPayload

	err := ValidateJsonPayload(ctx, &payload)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusBadRequest,
			Message:     "invalid JSON payload",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(ah.config.Environment))
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
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(ah.config.Environment))
		return
	}

	// check for user authenticaion
	id, err := ah.service.AuthenticateUser(ctx.Request.Context(), payload)

	// handle different errors
	if err != nil {
		errCode := http.StatusInternalServerError
		if errors.Is(err, constants.ErrRecordDoesNotExists) || errors.Is(err, constants.ErrAuthenticationFailed) {
			errCode = http.StatusBadRequest
		}
		errResp := ErrorResponse{
			Code:        errCode,
			Message:     "invalid user credentials",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(ah.config.Environment))
		return
	}

	// create user session
	session := sessions.Default(ctx)

	authToken, err := pkg.GenerateBase64Token(32)
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "cannot create authentication token",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(ah.config.Environment))
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
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(ah.config.Environment))
		return
	}

	// send response back to the client
	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "user loggedin successfully",
		Data: map[string]any{
			"auth_token": authToken,
		},
	}
	SendResponse(ctx, http.StatusOK, resp)
}

func (ah *AuthHandler) HandleLogoutUser(ctx *gin.Context) {
	session := sessions.Default(ctx)

	session.Delete("auth_token")
	session.Delete("user_id")
	err := session.Save()
	if err != nil {
		errResp := ErrorResponse{
			Code:        http.StatusInternalServerError,
			Message:     "cannot delete user session",
			Description: err.Error(),
		}
		SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(ah.config.Environment))
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "user logout successfully",
	}
	SendResponse(ctx, http.StatusOK, resp)
}
