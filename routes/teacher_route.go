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

	s := store.NewStore(db)
	teacherService := services.NewTeacherService(s)
	teacherHandler := handlers.NewTeacherHandler(teacherService, cfg)

	teacherRouter.POST("", teacherHandler.HandleCreateTeacherAccount)
	teacherRouter.GET("/me", middlewares.Protected(), teacherHandler.HandleGetTeacherDetails)

	teacherRouter.GET("/quizzes", middlewares.Protected(), teacherHandler.HandleGetAllQuizzes)
	teacherRouter.GET("/quizzes/:quizId/submissions", middlewares.Protected(), teacherHandler.HandleGetAllSubmissions)
}
