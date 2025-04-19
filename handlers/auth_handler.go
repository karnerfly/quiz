package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
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
	var (
		payload dto.LoginUserPayload
		env     = ah.config.Environment
	)

	err := ValidateJsonPayload(ctx, &payload)
	if err != nil {
		SendBadRequestError(ctx, "invalid json payload", err.Error(), env)
		return
	}

	// check for user authenticaion
	id, err := ah.service.AuthenticateUser(ctx.Request.Context(), payload)

	// handle different errors
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) || errors.Is(err, constants.ErrAuthenticationFailed) {
			SendBadRequestError(ctx, "user authentication failed", "invalid username or password", env)
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
	session.Options(sessions.Options{
		Path:     "/",
		Domain:   ah.config.Cookie.Domain,
		MaxAge:   ah.config.Cookie.MaxAge,
		Secure:   ah.config.Environment == "production",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})
	if err = session.Save(); err != nil {
		SendInternalServerError(ctx, err, env)
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
	if err := session.Save(); err != nil {
		SendInternalServerError(ctx, err, ah.config.Environment)
		return
	}

	resp := SuccessResponse{
		Code:    http.StatusOK,
		Message: "user logout successfully",
	}
	SendResponse(ctx, http.StatusOK, resp)
}

func (ah *AuthHandler) HandleGetAuthToken(ctx *gin.Context) {
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
