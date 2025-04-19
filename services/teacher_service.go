package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type UserService struct {
	store *store.UserStore
}

func NewTeacherService(userStore *store.UserStore) *UserService {
	return &UserService{store: userStore}
}

func (us *UserService) CreateNewTeacher(ctx context.Context, payload dto.CreateTeacherPayload) (uint, error) {
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
		Role:          models.Teacher,
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

func (us *UserService) GetCurrentTeacher(ctx context.Context, id uint) (models.User, error) {
	user, err := us.store.GetUserById(ctx, id)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			return models.User{}, fmt.Errorf("user does not exists: %w", err)
		}

		return models.User{}, err
	}

	return user, nil
}
