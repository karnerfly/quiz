package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/handlers"
	"github.com/karnerfly/quiz/middlewares"
	"github.com/karnerfly/quiz/services"
	"github.com/karnerfly/quiz/store"
	"gorm.io/gorm"
)

func initializeQuizRoutes(router *gin.RouterGroup, db *gorm.DB, cfg configs.Config) {
	quizRouter := router.Group("/quiz")

	store := store.NewStore(db)
	service := services.NewQuizService(store)
	handler := handlers.NewQuizHandler(service, cfg)

	// quizRouter.Use(middlewares.Protected())

	quizRouter.GET("", handler.HandleGetQuizByCode)
	quizRouter.POST("/new", middlewares.Protected(), handler.HandleCreateQuiz)
}
