package middlewares

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/handlers"
)

func Protected() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		_, err := ctx.Cookie("SID")
		if err != nil {
			handlers.SendErrorResponse(ctx, http.StatusUnauthorized, handlers.ErrorResponse{
				Code:        http.StatusUnauthorized,
				Message:     "unauthenticated request",
				Description: "missing SID in cookie",
			}, nil)
			ctx.Abort()
			return
		}

		authTokenHeader := ctx.GetHeader("Authorization")
		if authTokenHeader == "" {
			handlers.SendErrorResponse(ctx, http.StatusUnauthorized, handlers.ErrorResponse{
				Code:        http.StatusUnauthorized,
				Message:     "unauthenticated request",
				Description: "missing Authorization header",
			}, nil)
			ctx.Abort()
			return
		}

		session := sessions.Default(ctx)

		token := session.Get("auth_token")
		userId := session.Get("user_id")

		if token == nil || token != authTokenHeader || userId == nil {
			handlers.SendErrorResponse(ctx, http.StatusUnauthorized, handlers.ErrorResponse{
				Code:        http.StatusUnauthorized,
				Message:     "unauthenticated request",
				Description: "user is unauthenticated",
			}, nil)
			ctx.Abort()
			return
		}

		ctx.Set("userId", userId)
		ctx.Next()
	}
}
