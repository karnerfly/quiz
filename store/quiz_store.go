package store

import (
	"context"
	"errors"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

type QuizStore struct {
	client *gorm.DB
}

func NewQuizStore(client *gorm.DB) *QuizStore {
	return &QuizStore{client: client}
}

func (store *QuizStore) CreateQuiz(ctx context.Context, quiz models.Quiz) (string, error) {
	result := store.client.WithContext(ctx).Model(&models.Quiz{}).Create(&quiz)

	if result.Error != nil {
		return "", result.Error
	}

	return quiz.ShareCode, nil
}

func (store *QuizStore) IsOwner(ctx context.Context, quizId uint, teacherId uint) (bool, error) {
	var count int64
	err := store.client.WithContext(ctx).Model(&models.Quiz{}).Where("id = ? AND teacher_id = ?", quizId, teacherId).Count(&count).Error

	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (store *QuizStore) GetQuizById(ctx context.Context, quizId uint) (models.Quiz, error) {
	var quiz models.Quiz
	result := store.client.WithContext(ctx).Preload("Teacher").Preload("Questions").First(&quiz, quizId)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return models.Quiz{}, constants.ErrRecordDoesNotExists
		}

		return models.Quiz{}, result.Error
	}

	return quiz, nil
}

func (store *QuizStore) GetAllQuizzesByTeacherId(ctx context.Context, teacherId uint) ([]models.Quiz, error) {
	quizzes := []models.Quiz{}

	result := store.client.WithContext(ctx).Preload("Questions").Find(&quizzes).Where("teacher_id = ?", teacherId)

	if result.Error != nil {
		return nil, result.Error
	}
	return quizzes, nil
}

func (store *QuizStore) GetAllSubmissions(ctx context.Context, quizId uint) ([]models.StudentSubmission, error) {
	submissions := []models.StudentSubmission{}
	if err := store.client.WithContext(ctx).Model(&models.StudentSubmission{}).Preload("Answers").Find(&submissions).Where("quiz_id = ? AND status = 'finished'", quizId).Error; err != nil {
		return nil, err
	}

	return submissions, nil
}

func (store *QuizStore) GetSubmissionBySessionId(ctx context.Context, sessionId string) (models.StudentSubmission, error) {
	var submission models.StudentSubmission
	if err := store.client.WithContext(ctx).Model(&models.StudentSubmission{}).First(&submission).Where("session_id = ? AND status = 'finished'", sessionId).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.StudentSubmission{}, constants.ErrRecordDoesNotExists
		}

		return models.StudentSubmission{}, err
	}

	return submission, nil
}
