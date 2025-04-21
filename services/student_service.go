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

type StudentService struct {
	store *store.Store
}

func NewStudentService(studentStore *store.Store) *StudentService {
	return &StudentService{store: studentStore}
}

func (service *StudentService) CreateNewSubmission(ctx context.Context, payload dto.QuizSubmitPayload) (string, error) {
	submissionCode := pkg.GenerateShareCode()
	questionIds := make([]uint, len(payload.Answers))

	for i, answer := range payload.Answers {
		questionIds[i] = answer.QuestionId
	}

	questionIdAnsMap, err := service.store.GetCorrectAnswersOfQuestions(ctx, questionIds)
	if err != nil {
		return "", err
	}

	point := 1
	score := 0

	answers := make([]models.StudentAnswer, 0, len(payload.Answers))
	for i, qId := range questionIds {

		isCorrect := (*payload.Answers[i].SelectedIndex) == questionIdAnsMap[qId]

		answers = append(answers, models.StudentAnswer{
			QuestionId:    qId,
			SelectedIndex: *payload.Answers[i].SelectedIndex,
			IsCorrect:     isCorrect,
		})

		if isCorrect {
			score += point
		}
	}

	submission := models.StudentSubmission{
		Name:           payload.Name,
		Phone:          payload.Phone,
		District:       payload.District,
		QuizCode:       payload.QuizCode,
		Score:          score,
		SubmissionCode: submissionCode,
		Answers:        answers,
	}
	_, err = service.store.CreateNewSubmission(ctx, submission)
	if err != nil {
		return "", err
	}

	return submissionCode, err
}

func (service *StudentService) GetSubmissionByCode(ctx context.Context, submissionCode string) (models.StudentSubmission, error) {
	submission, err := service.store.GetSubmissionByCode(ctx, submissionCode)

	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			return models.StudentSubmission{}, fmt.Errorf("submission not found by given session id: %w", err)
		}

		return models.StudentSubmission{}, err
	}

	return submission, nil
}
