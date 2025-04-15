package configs

import (
	"os"
	"strconv"
	"time"
)

type ServerConfig struct {
	Address        string
	IdleTimeout    time.Duration
	WriteTimeout   time.Duration
	ReadTimeout    time.Duration
	MaxHeaderBytes int
}

type Config struct {
	Server ServerConfig
}

func New() Config {
	return Config{
		Server: ServerConfig{
			Address:        getEnvString("ADDRESS", ":3000"),
			IdleTimeout:    time.Second * time.Duration(getEnvInt("IDLE_TIMEOUT", 5)),
			ReadTimeout:    time.Second * time.Duration(getEnvInt("READ_TIMEOUT", 3)),
			WriteTimeout:   time.Second * time.Duration(getEnvInt("WRITE_TIMEOUT", 3)),
			MaxHeaderBytes: getEnvInt("MAX_HEADER_SIZE", 3<<20), // 3mb
		},
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
		panic("missing env value")
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
		panic("missing env value")
	}

	return i
}
