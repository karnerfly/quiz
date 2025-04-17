package handlers

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Code        int    `json:"code"`
	Message     string `json:"message"`
	Description string `json:"description"`
}

type SuccessResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

func SendErrorResponse(ctx *gin.Context, status int, errResp ErrorResponse, stack any) {
	ctx.JSON(status, gin.H{
		"status_text": http.StatusText(status),
		"response":    errResp,
		"stack":       stack,
	})
}

func SendNotFoundError(ctx *gin.Context, path string) {
	code := http.StatusNotFound

	SendErrorResponse(ctx, code, ErrorResponse{
		Code:        code,
		Message:     "route not found",
		Description: fmt.Sprintf(`the requested route "%s" not found`, path),
	}, nil)
}

func SendMethodNotAllowedError(ctx *gin.Context, method string) {
	code := http.StatusMethodNotAllowed

	SendErrorResponse(ctx, code, ErrorResponse{
		Code:        code,
		Message:     "method not found",
		Description: fmt.Sprintf(`the provided method %s is not allowed for this path`, method),
	}, nil)
}

func SendResponse(ctx *gin.Context, status int, resp SuccessResponse) {
	ctx.JSON(status, gin.H{
		"status_text": http.StatusText(status),
		"response":    resp,
	})
}

func ValidateJsonPayload(ctx *gin.Context, paylodPtr any) error {
	return ctx.ShouldBindJSON(paylodPtr)
}

func PrintStack(env string) string {
	if env == "production" {
		return ""
	}

	stack := debug.Stack()
	return string(stack)
}
