package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/handlers"
	"github.com/karnerfly/quiz/services"
	"github.com/karnerfly/quiz/store"
	"gorm.io/gorm"
)

func initializStudentRoutes(router *gin.RouterGroup, db *gorm.DB, cfg configs.Config) {
	studentRouter := router.Group("/student")

	s := store.NewStore(db)
	service := services.NewStudentService(s)
	handler := handlers.NewStudentHandler(service, cfg)

	studentRouter.GET("/", handler.HandleGetStudentDetails)
	studentRouter.POST("/quiz/start", handler.HandleStartQuiz)
	studentRouter.POST("/quiz/submit", handler.HandleSubmitQuiz)
	studentRouter.GET("/result", handler.HandleGetResultBySubmissionCode)
}
