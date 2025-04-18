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
	userRouter := router.Group("/user")

	store := store.NewUserStore(db)
	service := services.NewUserService(store)
	handler := handlers.NewUserHandler(service, cfg)

	userRouter.POST("", handler.HandleCreateUser)
	userRouter.GET("/me", middlewares.Protected(), handler.HandleGetMe)
	userRouter.GET("/me/token", handler.HandleGetAuthToken)
}
