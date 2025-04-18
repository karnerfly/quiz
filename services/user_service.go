package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type UserService struct {
	store *store.UserStore
}

func NewUserService(userStore *store.UserStore) *UserService {
	return &UserService{store: userStore}
}

func getUserRole(r string) models.UserRole {
	if r != "" {
		return models.UserRole(r)
	}

	return models.Teacher
}

func (us *UserService) CreateUser(ctx context.Context, payload models.CreateUserPayload) (uint, error) {
	encryptor := pkg.Encrypter{}

	encryptedToken, err := encryptor.Encrypt([]byte(payload.Email), encryptor.HashKey([]byte(payload.Password)))
	if err != nil {
		return 0, err
	}

	user := models.User{
		Name:          payload.Name,
		Email:         payload.Email,
		IdentityToken: encryptedToken,
		Phone:         payload.Phone,
		Role:          getUserRole(payload.Role),
	}

	id, err := us.store.CreateUser(ctx, user)

	if err != nil {
		if errors.Is(err, constants.ErrRecordAlreadyExists) {
			return 0, fmt.Errorf("email %s is already registered: %w", payload.Email, err)
		}

		return 0, err
	}

	return id, err
}

func (us *UserService) GetCurrentUser(ctx context.Context, id uint) (*models.UserResponsePayload, error) {
	user, err := us.store.GetUserById(ctx, id)
	if err != nil {
		return nil, err
	}

	resp := &models.UserResponsePayload{
		Id:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Phone:     user.Phone,
		Role:      string(user.Role),
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.CreatedAt,
	}

	return resp, nil
}
