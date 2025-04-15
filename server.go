package main

import (
	"context"
	"net/http"
	"time"

	"github.com/karnerfly/quiz/pkg/log"
)

type ServerOpts struct {
	Address        string
	Handler        *http.ServeMux
	IdleTimeout    time.Duration
	WriteTimeout   time.Duration
	ReadTimeout    time.Duration
	MaxHeaderBytes int
	ShutdownCtx    context.Context
}

func CreateServer(opts ServerOpts) *http.Server {
	return &http.Server{
		Addr:           opts.Address,
		Handler:        opts.Handler,
		ReadTimeout:    opts.ReadTimeout,
		WriteTimeout:   opts.WriteTimeout,
		IdleTimeout:    opts.IdleTimeout,
		MaxHeaderBytes: opts.MaxHeaderBytes,
	}
}

func Shutdown(ctx context.Context, s *http.Server) {
	err := s.Shutdown(ctx)
	if err != nil {
		log.Error(err)
	}
}
