package configs

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type ServerConfig struct {
	Address        string
	Domain         string
	IdleTimeout    time.Duration
	WriteTimeout   time.Duration
	ReadTimeout    time.Duration
	MaxHeaderBytes int
}

type RedisConfig struct {
	Url            string
	MaxConnections int
	Username       string
	Password       string
}

type DbConfig struct {
	Url            string
	MaxConnections int
}

type CookieConfig struct {
	Domain string
	MaxAge int
}

type Config struct {
	Server                  ServerConfig
	Redis                   RedisConfig
	Db                      DbConfig
	UserSessionCookie       CookieConfig
	SubmissionSessionCookie CookieConfig
	Environment             string
	CorsOrigin              string
}

func New() Config {
	return Config{
		Server: ServerConfig{
			Address:        getEnvString("ADDRESS", ":3000"),
			Domain:         getEnvString("DOMAIN", "localhost"),
			IdleTimeout:    time.Second * time.Duration(getEnvInt("IDLE_TIMEOUT", 5)),
			ReadTimeout:    time.Second * time.Duration(getEnvInt("READ_TIMEOUT", 3)),
			WriteTimeout:   time.Second * time.Duration(getEnvInt("WRITE_TIMEOUT", 3)),
			MaxHeaderBytes: getEnvInt("MAX_HEADER_SIZE", 3<<20), // 3mb
		},
		Redis: RedisConfig{
			Url:            getEnvStringMust("REDIS_URL"),
			MaxConnections: getEnvInt("REDIS_CONNECTIONS", 10),
			Username:       getEnvString("REDIS_USERNAME", ""),
			Password:       getEnvString("REDIS_PASSWORD", ""),
		},
		Db: DbConfig{
			Url:            getEnvStringMust("DATABASE_URL"),
			MaxConnections: getEnvInt("DATABASE_CONNECTIONS", 10),
		},
		UserSessionCookie: CookieConfig{
			Domain: getEnvStringMust("USER_SESSION_COOKIE_DOMAIN"),
			MaxAge: getEnvInt("USER_SESSION_COOKIE_EXPIRY", 2592000),
		},
		SubmissionSessionCookie: CookieConfig{
			Domain: getEnvStringMust("SUBMISSION_SESSION_COOKIE_DOMAIN"),
			MaxAge: getEnvInt("SUBMISSION_SESSION_COOKIE_EXPIRY", 2592000),
		},
		Environment: getEnvStringMust("ENV"),
		CorsOrigin:  getEnvString("CORS_ORIGIN", "*"),
	}
}

func getEnvString(key, defaultValue string) string {
	v := os.Getenv(key)
	if v == "" {
		return defaultValue
	}
	return v
}

func getEnvStringMust(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic(fmt.Sprintf("missing env value for key: %s", key))
	}
	return v
}

func getEnvInt(key string, defaultValue int) int {
	v := os.Getenv(key)

	i, err := strconv.Atoi(v)
	if err != nil {
		return defaultValue
	}

	return i
}

func getEnvIntMust(key string) int {
	v := os.Getenv(key)

	i, err := strconv.Atoi(v)
	if err != nil {
		panic(fmt.Sprintf("missing env value for key: %s", key))
	}

	return i
}
