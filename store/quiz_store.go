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

func (store *QuizStore) CreateQuiz(ctx context.Context, quiz models.Quiz) (uint, error) {
	result := store.client.WithContext(ctx).Model(&models.Quiz{}).Create(&quiz)

	if result.Error != nil {
		return 0, result.Error
	}

	return quiz.ID, nil
}

func (store *QuizStore) GetQuestionCount(ctx context.Context, quizId uint, hostId uint) (int64, error) {
	var totalQuestions int64
	var currentQuestionCount int64

	result := store.client.WithContext(ctx).Model(&models.Quiz{}).Where("id = ? AND host_id = ?", quizId, hostId).Select("no_of_questions").Scan(&totalQuestions)

	if result.Error != nil {
		return 0, result.Error
	}

	if result.RowsAffected == 0 {
		return 0, constants.ErrRecordDoesNotExists
	}

	result = store.client.WithContext(ctx).Model(&models.Question{}).Where("quiz_id = ?", quizId).Count(&currentQuestionCount)

	if result.Error != nil {
		return 0, result.Error
	}

	if currentQuestionCount == totalQuestions {
		return 0, constants.ErrMaxNumberExceed
	}

	return currentQuestionCount, nil
}

func (store *QuizStore) GetQuizById(ctx context.Context, quizId uint, hostId uint) (*models.Quiz, error) {
	var quiz *models.Quiz
	result := store.client.WithContext(ctx).Preload("Host").Preload("Questions").Where("id = ? AND host_id = ?", quizId, hostId).First(&quiz)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, constants.ErrRecordDoesNotExists
		}

		return nil, result.Error
	}

	return quiz, nil
}

func (store *QuizStore) GetAllQuizzesByHostId(ctx context.Context, hostId uint) ([]models.Quiz, error) {
	quizzes := []models.Quiz{}

	result := store.client.WithContext(ctx).
		Where("host_id = ?", hostId).
		Preload("Questions", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "created_at", "updated_at", "deleted_at", "quiz_id", "problem", "options", "answers")
		}).
		Select("id", "created_at", "updated_at", "deleted_at", "title", "subject",
			"no_of_questions", "current_question_count", "host_id", "status",
			"duration", "expiry", "is_negative_marking").
		Find(&quizzes)

	if result.Error != nil {
		return nil, result.Error
	}
	return quizzes, nil
}

func (store *QuizStore) AddQuestionToQuiz(ctx context.Context, quizId uint, questionCount int64, question models.Question) (uint, error) {
	result := store.client.WithContext(ctx).Model(&models.Question{}).Create(&question)
	if result.Error != nil {
		return 0, result.Error
	}

	result = store.client.WithContext(ctx).Model(&models.Quiz{}).Where("id = ?", quizId).Update("current_question_count", questionCount)
	if result.Error != nil {
		return 0, result.Error
	}

	return question.ID, nil
}

func (store *QuizStore) AddQuestionToQuizInBatch(ctx context.Context, quizId uint, questions []models.Question) error {
	result := store.client.WithContext(ctx).Model(&models.Question{}).CreateInBatches(questions, len(questions))
	return result.Error
}
