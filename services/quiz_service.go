package services

import (
	"context"
	"time"

	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type QuizService struct {
	store *store.Store
}

func NewQuizService(quizStore *store.Store) *QuizService {
	return &QuizService{store: quizStore}
}

func (qs *QuizService) CreateNewQuiz(ctx context.Context, teacherId uint, payload dto.CreateQuizPayload) (string, error) {

	questions := make([]models.Question, 0, len(payload.Questions))

	for _, q := range payload.Questions {
		questions = append(questions, models.Question{
			Problem:       q.Problem,
			Options:       q.Options,
			CorrectAnswer: *q.CorrectAnswer,
		})
	}

	quiz := models.Quiz{
		Title:             payload.Title,
		Subject:           payload.Subject,
		ShareCode:         pkg.GenerateShareCode(),
		NoOfQuestions:     payload.NoOfQuestions,
		TeacherId:         teacherId,
		Status:            models.StatusQuizInActive,
		Duration:          time.Minute * time.Duration(payload.Duration),
		Expiry:            payload.Expiry,
		IsNegativeMarking: payload.Rule.IsNegativeMarking,
		Questions:         questions,
	}

	shareCode, err := qs.store.CreateQuiz(ctx, quiz)
	if err != nil {
		return "", err
	}

	return shareCode, nil
}

func (qs *QuizService) GetQuizById(ctx context.Context, quizId uint) (models.Quiz, error) {
	return qs.store.GetQuizById(ctx, quizId)
}

func (qs *QuizService) GetQuizByCode(ctx context.Context, quizCode string) (models.Quiz, error) {
	return qs.store.GetQuizByCode(ctx, quizCode)
}
