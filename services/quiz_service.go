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

type AnalysisQuestionResponse struct {
	models.Question
	CorrectAnswer int `json:"correct_answer"`
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
		Status:            models.StatusQuizActive,
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

func (qs *QuizService) GetQuizByCode(ctx context.Context, quizCode string, isAnalysisMode bool) (any, error) {
	quiz, err := qs.store.GetQuizByCode(ctx, quizCode)
	if err != nil {
		return nil, err
	}

	var q struct {
		models.Quiz
		Questions []AnalysisQuestionResponse `json:"questions"`
	}

	q.Quiz = quiz

	if isAnalysisMode {
		for _, question := range quiz.Questions {
			q.Questions = append(q.Questions, AnalysisQuestionResponse{
				Question:      question,
				CorrectAnswer: question.CorrectAnswer,
			})
		}
	} else {
		for _, question := range quiz.Questions {
			q.Questions = append(q.Questions, AnalysisQuestionResponse{
				Question:      question,
				CorrectAnswer: -1,
			})
		}
	}

	return q, nil
}
