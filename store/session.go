package store

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/pkg/log"
)

const (
	UserSession      = "SID"
	QuizStartSession = "start_quiz_session"
)

func InitializeSession(r *gin.Engine, cfg configs.Config) error {
	store, err := redis.NewStore(cfg.Redis.MaxConnections, "tcp", cfg.Redis.Url, cfg.Redis.Username, cfg.Redis.Password, []byte("secret"))
	if err != nil {
		return err
	}

	sessionNames := []string{UserSession, QuizStartSession}

	r.Use(sessions.SessionsMany(sessionNames, store))

	log.Println("session initialized")

	return nil
}
