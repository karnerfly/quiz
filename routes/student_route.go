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

	store := store.NewQuizStore(db)
	service := services.NewQuizeService(store)
	handler := handlers.NewStudentHandler(service, cfg)

	studentRouter.GET("/result", handler.HandleGetResult)
}
