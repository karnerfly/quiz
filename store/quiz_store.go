package store

import (
	"context"
	"errors"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

func (store *Store) CreateQuiz(ctx context.Context, quiz models.Quiz) (string, error) {
	result := store.client.WithContext(ctx).Model(&models.Quiz{}).Create(&quiz)

	if result.Error != nil {
		return "", result.Error
	}

	return quiz.ShareCode, nil
}

func (store *Store) IsQuizOwner(ctx context.Context, quizId uint, teacherId uint) (bool, error) {
	var count int64

	if err := store.client.WithContext(ctx).
		Model(&models.Quiz{}).
		Where("id = ? AND teacher_id = ?", quizId, teacherId).
		Count(&count).Error; err != nil {
		return false, err
	}

	return count > 0, nil
}

func (store *Store) GetQuizById(ctx context.Context, quizId uint) (models.Quiz, error) {
	var quiz models.Quiz

	if err := store.client.WithContext(ctx).Preload("Teacher").Preload("Questions").First(&quiz, quizId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.Quiz{}, constants.ErrRecordDoesNotExists
		}

		return models.Quiz{}, err
	}

	return quiz, nil
}

func (store *Store) GetQuizByCode(ctx context.Context, quizCode string) (models.Quiz, error) {
	var quiz models.Quiz

	if err := store.client.WithContext(ctx).
		Preload("Teacher").
		Preload("Questions").
		Where("share_code = ?", quizCode).
		First(&quiz).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.Quiz{}, constants.ErrRecordDoesNotExists
		}

		return models.Quiz{}, err
	}

	return quiz, nil
}
