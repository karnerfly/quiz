package services

import (
	"context"
	"time"

	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/store"
)

type QuizService struct {
	store *store.QuizStore
}

func NewQuizeService(quizStore *store.QuizStore) *QuizService {
	return &QuizService{store: quizStore}
}

func (qs *QuizService) CreateNewQuiz(ctx context.Context, hostId uint, payload models.CreateQuizPayload) (uint, error) {
	quiz := models.Quiz{
		Title:         payload.Title,
		Subject:       payload.Subject,
		NoOfQuestions: payload.NoOfQuestions,
		HostId:        hostId,
		Status:        models.StatusPending,
		Duration:      time.Minute * time.Duration(payload.Duration),
		Expiry:        payload.Expiry,
		Rule:          models.Rules(payload.Rule),
	}

	quizId, err := qs.store.CreateQuiz(ctx, quiz)
	if err != nil {
		return 0, err
	}

	return quizId, nil
}

func (qs *QuizService) AddQuestion(ctx context.Context, quizId uint, hostId uint, payload models.AddQuestionPayload) (uint, error) {
	questionCount, err := qs.store.GetQuestionCount(ctx, quizId, hostId)
	if err != nil {
		return 0, err
	}

	question := models.Question{
		QuizId:  quizId,
		Problem: payload.Problem,
		Options: payload.Options,
		Answers: payload.Answers,
	}

	quizId, err = qs.store.AddQuestionToQuiz(ctx, quizId, questionCount+1, question)
	if err != nil {
		return 0, err
	}

	return quizId, nil
}

func (qs *QuizService) GetAllQuizzes(ctx context.Context, hostId uint) ([]models.Quiz, error) {
	return qs.store.GetAllQuizzesByHostId(ctx, hostId)

	// resp := make([]models.QuizResponse, 0, len(quizzes))
	// for _, quiz := range quizzes {
	// 	qResp := models.QuizResponse{
	// 		ID:                   quiz.ID,
	// 		Title:                quiz.Title,
	// 		Subject:              quiz.Subject,
	// 		NoOfQuestions:        quiz.NoOfQuestions,
	// 		CurrentQuestionCount: quiz.CurrentQuestionCount,
	// 		Duration:             quiz.Duration,
	// 		Expiry:               quiz.Expiry,
	// 		Status:               quiz.Status,
	// 		Questions:            quiz.Questions,
	// 	}
	// 	resp = append(resp, qResp)
	// }

	// return resp, nil
}
