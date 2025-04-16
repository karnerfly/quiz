package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Code        int
	Message     string
	Description string
}

func SendErrorResponse(ctx *gin.Context, status int, statusText string, errResp ErrorResponse, stack []any) {
	ctx.JSON(status, gin.H{
		"status_text": statusText,
		"response":    errResp,
		"stack":       stack,
	})
}

func SendNotFoundError(ctx *gin.Context, path string) {

	code := http.StatusNotFound

	SendErrorResponse(ctx, code, http.StatusText(code), ErrorResponse{
		Code:        code,
		Message:     "route not found",
		Description: fmt.Sprintf(`the requested route "%s" not found`, path),
	}, nil)
}
