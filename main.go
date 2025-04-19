package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/karnerfly/quiz/configs"
	"github.com/karnerfly/quiz/db"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/pkg/log"
	"github.com/karnerfly/quiz/routes"
	"github.com/karnerfly/quiz/store"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	cfg := configs.New()

	router := gin.Default()

	if err := store.InitializeSession(router, cfg); err != nil {
		log.Fatal(err)
	}

	dbClient, err := db.CreateDatabaseClient(cfg.Db.Url, cfg.Db.MaxConnections)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("database connected")

	if err = db.CreateEnums(dbClient); err != nil {
		log.Fatal(err)
	}

	if err = db.Migrate(dbClient, &models.User{}, &models.Quiz{}, &models.Question{}, &models.StudentSubmission{}, &models.StudentAnswer{}); err != nil {
		log.Fatal(err)
	}

	if err = db.CreateConstrains(dbClient); err != nil {
		log.Fatal(err)
	}

	// Initialize routes
	routes.InitializeV1(router, dbClient, cfg)

	serverShutdownCtx, serverShutdownCancle := context.WithTimeout(context.Background(), time.Second*5)
	defer serverShutdownCancle()

	opts := ServerOpts{
		Address:        cfg.Server.Address,
		Handler:        router,
		ReadTimeout:    cfg.Server.ReadTimeout,
		WriteTimeout:   cfg.Server.WriteTimeout,
		IdleTimeout:    cfg.Server.IdleTimeout,
		MaxHeaderBytes: cfg.Server.MaxHeaderBytes,
		ShutdownCtx:    serverShutdownCtx,
	}

	// Create Server
	server := CreateServer(opts)

	go func() {
		log.Println(fmt.Sprintf("server started listing at %s", opts.Address))
		err := server.ListenAndServe()
		if err != nil {
			log.Error(err)
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// wait for shutdown signal
	<-sig
	log.Println("shutting down the server and free the resources")
	/*
		free resources
		.......
	*/

	// shutdown the server
	Shutdown(opts.ShutdownCtx, server)
}
