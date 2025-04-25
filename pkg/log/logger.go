package log

import (
	"fmt"
	"log"
	"os"

	"github.com/karnerfly/quiz/constants"
)

type logger struct {
	stdout *log.Logger
	stderr *log.Logger
}

var defaultLogger logger

func init() {
	defaultLogger = logger{
		stdout: log.New(os.Stdout, constants.LogInfoPrefix, log.LstdFlags),
		stderr: log.New(os.Stderr, fmt.Sprintf("%s%s%s", constants.LogColorRed, constants.LogErrorPrefix, constants.LogColorReset), log.LstdFlags),
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
	defaultLogger.stderr.Println(append(v, constants.LogColorReset)...)
}

func Errorf(format string, v ...any) {
	defaultLogger.stderr.Printf(format, append(v, constants.LogColorReset)...)
}

func Fatal(v ...any) {
	defaultLogger.stderr.Fatal(append(v, constants.LogColorReset)...)
}

func Fatalf(format string, v ...any) {
	defaultLogger.stderr.Fatalf(format, v...)
}

func Fatalln(v ...any) {
	defaultLogger.stderr.Fatalln(append(v, constants.LogColorReset)...)
}
