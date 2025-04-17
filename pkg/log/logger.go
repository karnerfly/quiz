package log

import (
	"fmt"
	"log"
	"os"
)

const (
	colorRed    = "\033[31m"
	colorReset  = "\033[0m"
	errorPrefix = "[ERROR]::"
	infoPrefix  = "[INFO]::"
)

type logger struct {
	stdout *log.Logger
	stderr *log.Logger
}

var defaultLogger logger

func init() {
	defaultLogger = logger{
		stdout: log.New(os.Stdout, infoPrefix, log.LstdFlags),
		stderr: log.New(os.Stderr, fmt.Sprintf("%s%s", colorRed, errorPrefix), log.LstdFlags),
	}
}

func Print(v ...any) {
	defaultLogger.stdout.Print(v...)
}

func Printf(format string, v ...any) {
	defaultLogger.stdout.Printf(format, v...)
}

func Println(v ...any) {
	defaultLogger.stdout.Println(v...)
}

func Error(v ...any) {
	defaultLogger.stderr.Println(append(v, colorReset)...)
}

func Errorf(format string, v ...any) {
	defaultLogger.stderr.Printf(format, append(v, colorReset)...)
}

func Fatal(v ...any) {
	defaultLogger.stderr.Fatal(append(v, colorReset)...)
}

func Fatalf(format string, v ...any) {
	defaultLogger.stderr.Fatalf(fmt.Sprintf("%s%s", format, colorReset), v...)
}

func Fatalln(v ...any) {
	defaultLogger.stderr.Fatalln(append(v, colorReset)...)
}
