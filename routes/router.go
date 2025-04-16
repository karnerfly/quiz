package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/pkg/log"
)

func InitializeV1(r *gin.Engine) {
	router := r.Group("/api/v1")

	router.GET("/_health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":      "OK",
			"code":        200,
			"app":         "quiz app",
			"version":     "v-0.1",
			"environment": "development",
		})
	})

	router.POST("/_health", func(ctx *gin.Context) {
		data := make(map[string]any)

		err := ctx.ShouldBindJSON(data)

		if err != nil {
			log.Error(err)
			ctx.JSON(http.StatusBadRequest, gin.H{
				"status":      "BAD REQUEST",
				"code":        400,
				"app":         "quiz app",
				"version":     "v-0.1",
				"environment": "development",
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
