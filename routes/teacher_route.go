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

func initializeUserRoutes(router *gin.RouterGroup, db *gorm.DB, cfg configs.Config) {
	teacherRouter := router.Group("/teacher")

	teacherStore := store.NewUserStore(db)

	teacherService := services.NewTeacherService(teacherStore)
	teacherHandler := handlers.NewTeacherHandler(teacherService, cfg)

	quizStore := store.NewQuizStore(db)
	quizService := services.NewQuizeService(quizStore)
	quizHandler := handlers.NewQuizHandler(quizService, cfg)

	teacherRouter.POST("", teacherHandler.HandleCreateTeacherAccount)
	teacherRouter.GET("/me", middlewares.Protected(), teacherHandler.HandleGetMe)

	teacherRouter.GET("/quizzes", middlewares.Protected(), quizHandler.HandleGetAllQuizzes)
	teacherRouter.GET("/quizzes/:quizId/submissions", middlewares.Protected(), quizHandler.HandleGetAllSubmissions)
}
