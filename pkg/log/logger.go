package log

import (
	"log"
	"os"
)

type Logger struct {
	StdoutLogger *log.Logger
	StderrLogger *log.Logger
}

var defaultLogger Logger

func init() {
	defaultLogger = Logger{
		StdoutLogger: log.New(os.Stdout, "[INFO]::", 1),
		StderrLogger: log.New(os.Stderr, "[ERROR]::", 1),
	}
}

func Print(v ...any) {
	defaultLogger.StdoutLogger.Print(v...)
}

func Printf(format string, v ...any) {
	defaultLogger.StdoutLogger.Printf(format, v...)
}

func Println(v ...any) {
	defaultLogger.StdoutLogger.Println(v...)
}

func Error(v ...any) {
	defaultLogger.StderrLogger.Println(v...)
}

func Errorf(format string, v ...any) {
	defaultLogger.StderrLogger.Printf(format, v...)
}
