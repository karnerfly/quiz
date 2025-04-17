package store

import (
	"fmt"

	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

type UserStore struct {
	client *gorm.DB
}

func NewUserStore(client *gorm.DB) *UserStore {
	return &UserStore{client: client}
}

func (c *UserStore) CreateUser(u models.User) (uint, error) {
	result := c.client.Create(&u)

	if result.Error != nil {
		return 0, fmt.Errorf("error while creating user")
	}

	return u.Model.ID, nil
}
