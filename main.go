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
	"github.com/karnerfly/quiz/pkg/log"
	"github.com/karnerfly/quiz/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	cfg := configs.New()

	router := gin.Default()
	routes.InitializeV1(router)

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
