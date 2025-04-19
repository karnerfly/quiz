package services

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type QuizService struct {
	store *store.QuizStore
}

func NewQuizeService(quizStore *store.QuizStore) *QuizService {
	return &QuizService{store: quizStore}
}

func (qs *QuizService) CreateNewQuiz(ctx context.Context, teacherId uint, payload dto.CreateQuizPayload) (string, error) {

	questions := make([]models.Question, 0, len(payload.Questions))

	for _, q := range payload.Questions {
		questions = append(questions, models.Question{
			Problem:        q.Problem,
			Options:        q.Options,
			CorrectAnswers: q.CorrectAnswers,
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

// func (qs *QuizService) AddQuestion(ctx context.Context, quizId uint, hostId uint, payload models.AddQuestionPayload) (uint, error) {
// 	questionCount, err := qs.store.GetQuestionCount(ctx, quizId, hostId)
// 	if err != nil {
// 		return 0, err
// 	}

// 	question := models.Question{
// 		QuizId:  quizId,
// 		Problem: payload.Problem,
// 		Options: payload.Options,
// 		Answers: payload.Answers,
// 	}

// 	quizId, err = qs.store.AddQuestionToQuiz(ctx, quizId, questionCount+1, question)
// 	if err != nil {
// 		return 0, err
// 	}

// 	return quizId, nil
// }

func (qs *QuizService) GetQuizById(ctx context.Context, quizId uint, teacherId uint) (models.Quiz, error) {
	owner, err := qs.store.IsOwner(ctx, quizId, teacherId)
	if err != nil {
		return models.Quiz{}, err
	}

	if !owner {
		return models.Quiz{}, constants.ErrRecordDoesNotExists
	}

	return qs.store.GetQuizById(ctx, quizId)
}

func (qs *QuizService) GetAllQuizzesByTeacherId(ctx context.Context, teacherId uint) ([]models.Quiz, error) {
	return qs.store.GetAllQuizzesByTeacherId(ctx, teacherId)

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

func (qs *QuizService) GetAllSubmissions(ctx context.Context, quizId uint, teacherId uint) ([]models.StudentSubmission, error) {
	owner, err := qs.store.IsOwner(ctx, quizId, teacherId)
	if err != nil {
		return nil, err
	}

	if !owner {
		return nil, constants.ErrRecordDoesNotExists
	}

	return qs.store.GetAllSubmissions(ctx, quizId)
}

func (qs *QuizService) GetSubmissionBySessionId(ctx context.Context, sessionId string) (models.StudentSubmission, error) {
	submission, err := qs.store.GetSubmissionBySessionId(ctx, sessionId)

	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			return models.StudentSubmission{}, fmt.Errorf("submission not found by given session id: %w", err)
		}

		return models.StudentSubmission{}, err
	}

	return submission, nil
}
