package store

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/pkg/log"
)

func InitializeSession(r *gin.Engine, cfg configs.Config) error {
	store, err := redis.NewStore(cfg.Redis.MaxConnections, "tcp", cfg.Redis.Url, cfg.Redis.Username, cfg.Redis.Password, []byte("secret"))
	if err != nil {
		return err
	}

	r.Use(sessions.Sessions("SID", store))

	log.Println("session initialized")

	return nil
}
