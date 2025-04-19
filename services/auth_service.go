package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type AuthService struct {
	store *store.UserStore
}

func NewAuthService(userStore *store.UserStore) *AuthService {
	return &AuthService{store: userStore}
}

func (as *AuthService) AuthenticateUser(ctx context.Context, payload dto.LoginUserPayload) (uint, error) {
	user, err := as.store.GetUserByEmail(ctx, payload.Email)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			return 0, fmt.Errorf("email %s does not exists: %w", payload.Email, err)
		}

		return 0, err
	}

	encryptor := pkg.Encrypter{}

	email, err := encryptor.Decrypt(user.IdentityToken, encryptor.HashKey([]byte(payload.Password)))
	if err != nil {
		if errors.Is(err, constants.ErrAuthenticationFailed) {
			return 0, fmt.Errorf("user authentication failed: %w", err)
		}

		return 0, err
	}

	if email != user.Email {
		return 0, fmt.Errorf("user authentication failed: %w", constants.ErrAuthenticationFailed)
	}

	return user.ID, nil
}
