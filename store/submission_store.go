package store

import (
	"context"

	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

type StudentStore struct {
	client *gorm.DB
}

func NewStudentStore(client *gorm.DB) *StudentStore {
	return &StudentStore{client: client}
}

func (store *StudentStore) CreateNewSubmission(ctx context.Context, submission models.StudentSubmission) (uint, error) {
	return 0, nil
}
