package handlers

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
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

func SendInternalServerError(ctx *gin.Context, err error, env string) {
	errResp := ErrorResponse{
		Code:        http.StatusInternalServerError,
		Message:     "internal server error",
		Description: err.Error(),
	}
	SendErrorResponse(ctx, http.StatusInternalServerError, errResp, PrintStack(env))
}

func SendBadRequestError(ctx *gin.Context, message string, description string, env string) {
	errResp := ErrorResponse{
		Code:        http.StatusBadRequest,
		Message:     message,
		Description: description,
	}
	SendErrorResponse(ctx, http.StatusBadRequest, errResp, PrintStack(env))
}

func SendResourceNotFoundError(ctx *gin.Context, message string, description string, env string) {
	errResp := ErrorResponse{
		Code:        http.StatusNotFound,
		Message:     message,
		Description: description,
	}
	SendErrorResponse(ctx, http.StatusNotFound, errResp, PrintStack(env))
}

func SendRouteNotFoundError(ctx *gin.Context, path string) {
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
	err := ctx.ShouldBindJSON(paylodPtr)
	if err != nil {
		return err
	}
	v := validator.New()

	return v.Struct(paylodPtr)
}

func PrintStack(env string) string {
	if env == "production" {
		return ""
	}

	stack := debug.Stack()
	return string(stack)
}
