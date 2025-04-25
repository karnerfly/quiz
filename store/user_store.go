package store

import (
	"context"
	"errors"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"gorm.io/gorm"
)

func (store *Store) CreateUser(ctx context.Context, user models.User) (uint, error) {
	if err := store.client.WithContext(ctx).Model(&models.User{}).Create(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return 0, constants.ErrRecordAlreadyExists
		}

		return 0, err
	}

	return user.ID, nil
}

func (store *Store) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User

	if err := store.client.WithContext(ctx).Model(&models.User{}).Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.User{}, constants.ErrRecordDoesNotExists
		}

		return models.User{}, err
	}

	return user, nil
}

func (store *Store) GetUserById(ctx context.Context, id uint) (models.User, error) {
	var user models.User

	if err := store.client.WithContext(ctx).Model(&models.User{}).First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.User{}, constants.ErrRecordDoesNotExists
		}

		return models.User{}, err
	}

	return user, nil
}

func (store *Store) EmailExists(ctx context.Context, email string) (bool, error) {
	var count int64

	if err := store.client.WithContext(ctx).Model(&models.User{}).Where("email = ?", email).Count(&count).Error; err != nil {
		return false, err
	}

	return count > 0, nil
}

func (store *Store) CreateNewSubmission(ctx context.Context, submission models.StudentSubmission) (uint, error) {
	var count int64

	if err := store.client.WithContext(ctx).
		Model(&models.Quiz{}).
		Where("share_code = ?", submission.QuizCode).
		First(&models.Quiz{}).
		Count(&count).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 0, constants.ErrRecordDoesNotExists
		}

		return 0, err
	}

	if err := store.client.WithContext(ctx).Model(&models.StudentSubmission{}).Create(&submission).Error; err != nil {
		return 0, err
	}

	return submission.Id, nil
}

func (store *Store) GetSubmissionByCode(ctx context.Context, submissionCode string) (models.StudentSubmission, error) {
	var submission models.StudentSubmission

	if err := store.client.WithContext(ctx).
		Model(&models.StudentSubmission{}).
		Preload("Answers").
		Where("submission_code = ?", submissionCode).
		First(&submission).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.StudentSubmission{}, constants.ErrRecordDoesNotExists
		}

		return models.StudentSubmission{}, err
	}

	return submission, nil
}

func (store *Store) GetAllQuizzesByTeacherId(ctx context.Context, teacherId uint) ([]models.Quiz, error) {
	quizzes := []models.Quiz{}

	err := store.client.WithContext(ctx).
		Model(&models.Quiz{}).
		Preload("Questions").
		Where("teacher_id = ?", teacherId).
		Find(&quizzes).Error

	if err != nil {
		return nil, err
	}

	if len(quizzes) == 0 {
		return []models.Quiz{}, nil
	}

	quizCodes := make([]string, len(quizzes))
	for i, q := range quizzes {
		quizCodes[i] = q.ShareCode
	}

	var counts []struct {
		QuizCode string
		Count    int
	}

	if err = store.client.WithContext(ctx).
		Model(&models.StudentSubmission{}).
		Select("quiz_code, COUNT(*) as count").
		Where("quiz_code IN ?", quizCodes).
		Group("quiz_code").
		Find(&counts).Error; err != nil {
		return nil, err
	}

	// Create a map of quiz ID to submission count
	countMap := make(map[string]int)
	for _, c := range counts {
		countMap[c.QuizCode] = c.Count
	}

	// Assign counts to each quiz
	for i := range quizzes {
		quizzes[i].TotalSubmissions = countMap[quizzes[i].ShareCode]
	}

	return quizzes, nil
}

func (store *Store) GetAllSubmissionsByTeacherId(ctx context.Context, teacherId uint) ([]models.StudentSubmission, error) {
	submissions := []models.StudentSubmission{}

	if err := store.client.Joins("JOIN quizzes ON quizzes.share_code = student_submissions.quiz_code").
		Preload("Answers").
		Where("quizzes.teacher_id = ?", teacherId).
		Find(&submissions).Error; err != nil {
		return nil, err
	}

	return submissions, nil
}

func (store *Store) GetCorrectAnswersOfQuestions(ctx context.Context, questionIds []uint) (map[uint]int, error) {
	if len(questionIds) == 0 {
		return map[uint]int{}, nil
	}

	questionIdAnsMap := make(map[uint]int)

	var questionAnswers []struct {
		ID            uint
		CorrectAnswer int
	}

	if err := store.client.WithContext(ctx).
		Model(&models.Question{}).
		Select("id", "correct_answer").
		Where("id IN ?", questionIds).
		Find(&questionAnswers).Error; err != nil {
		return nil, err
	}

	for _, entry := range questionAnswers {
		questionIdAnsMap[entry.ID] = entry.CorrectAnswer
	}

	return questionIdAnsMap, nil
}
