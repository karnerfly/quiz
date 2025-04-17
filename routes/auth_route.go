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

func initializeAuthRoutes(router *gin.RouterGroup, db *gorm.DB, cfg configs.Config) {
	authRouter := router.Group("/auth")

	store := store.NewUserStore(db)
	service := services.NewAuthService(store)
	handler := handlers.NewAuthHandler(service, cfg)

	authRouter.POST("/login", handler.HandleLoginUser)
	authRouter.POST("/logout", middlewares.Protected(), handler.HandleLogoutUser)
}
