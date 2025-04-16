package routes

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/handlers"
	"github.com/karnerfly/quiz/pkg/log"
)

func InitializeV1(engine *gin.Engine, cfg configs.Config) {

	engine.NoRoute(func(ctx *gin.Context) {
		path := ctx.Request.URL.Path
		handlers.SendNotFoundError(ctx, path)
	})

	router := engine.Group("/api/v1")

	router.GET("/_health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":      "OK",
			"code":        200,
			"app":         "quiz app",
			"version":     "v-0.1",
			"environment": cfg.Environment,
		})
	})

	router.POST("/_health", func(ctx *gin.Context) {
		data := make(map[string]any)

		err := ctx.ShouldBindJSON(&data)

		if err != nil {
			log.Error(err)

			msg := "invalid JSON payload"
			if err == io.EOF {
				msg = "empty JSON payload"
			}

			ctx.JSON(http.StatusBadRequest, gin.H{
				"status":      "BAD REQUEST",
				"code":        400,
				"app":         "quiz app",
				"version":     "v-0.1",
				"message":     msg,
				"environment": cfg.Environment,
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"status":      "OK",
			"code":        200,
			"app":         "quiz app",
			"version":     "v-0.1",
			"environment": "development",
			"data":        data,
		})
	})
}
