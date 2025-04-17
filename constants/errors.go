package constants

import (
	"errors"
)

var (
	ErrRecordAlreadyExists  = errors.New("record already exists")
	ErrRecordDoesNotExists  = errors.New("record does not exists")
	ErrAuthenticationFailed = errors.New("authentication failed")
)
