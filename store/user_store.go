package store

import (
	"context"
	"errors"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

type UserStore struct {
	client *gorm.DB
}

func NewUserStore(client *gorm.DB) *UserStore {
	return &UserStore{client: client}
}

func (store *UserStore) CreateUser(ctx context.Context, user models.User) (uint, error) {
	result := store.client.WithContext(ctx).Model(&models.User{}).Create(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return 0, constants.ErrRecordAlreadyExists
		}

		return 0, result.Error
	}

	return user.ID, nil
}

func (store *UserStore) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User

	result := store.client.WithContext(ctx).Model(&models.User{}).Where("email = ?", email).First(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return models.User{}, constants.ErrRecordDoesNotExists
		}

		return models.User{}, result.Error
	}

	return user, nil
}

func (store *UserStore) GetUserById(ctx context.Context, id uint) (models.User, error) {
	var user models.User

	result := store.client.WithContext(ctx).Model(&models.User{}).Select("id", "name", "email", "phone", "role", "created_at", "updated_at").First(&user, id)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return models.User{}, constants.ErrRecordDoesNotExists
		}

		return models.User{}, result.Error
	}

	return user, nil
}

func (store *UserStore) EmailExists(ctx context.Context, email string) (bool, error) {
	var id uint
	result := store.client.WithContext(ctx).Model(&models.User{}).Where("email = ?", email).Select("id").First(&id)

	if result.Error != nil {
		return false, result.Error
	}

	return id > 0, nil
}
