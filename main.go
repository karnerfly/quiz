package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/karnerfly/quiz/pkg/log"
)

func main() {
	mux := http.NewServeMux()

	serverShutdownCtx, serverShutdownCancle := context.WithTimeout(context.Background(), time.Second*5)
	defer serverShutdownCancle()

	opts := ServerOpts{
		Address:        ":3000",
		Handler:        mux,
		ReadTimeout:    time.Second * 3,
		WriteTimeout:   time.Second * 3,
		IdleTimeout:    time.Second * 5,
		MaxHeaderBytes: 3 << 20, // 3mb
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
