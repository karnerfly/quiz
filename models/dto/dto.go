package dto

import "time"

type CreateTeacherPayload struct {
	Name     string `json:"name" validate:"required,min=4,max=30"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
	Phone    string `json:"phone" validate:"required"`
}

type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
}

type CreateQuizPayload struct {
	Title         string            `json:"title" validate:"required"`
	Subject       string            `json:"subject" validate:"required"`
	NoOfQuestions int               `json:"no_of_questions" validate:"required,min=1,max=100"`
	Duration      int               `json:"duration" validate:"required,oneof=15 30 45 60 90 120 180"`
	Questions     []QuestionPayload `json:"questions" validate:"required,min=1,max=100,dive"`
	Expiry        time.Time         `json:"expiry"`
	Rule          RulePayload       `json:"rule"`
}

type RulePayload struct {
	IsNegativeMarking bool `json:"is_negative_marking"`
}

type QuestionPayload struct {
	Problem       string   `json:"problem" validate:"required"`
	Options       []string `json:"options" validate:"required,min=2,dive,required"`
	CorrectAnswer *int     `json:"correct_answer" validate:"required,gte=0"`
}

type QuizSubmitPayload struct {
	Name    string              `json:"name" validate:"required,min=4,max=30"`
	Phone   string              `json:"phone" validate:"required"`
	QuizId  uint                `json:"quiz_id" validate:"required,gt=0"`
	Answers []QuizAnswerPayload `json:"answers" validate:"required,min=1,max=100,dive"`
}

type QuizAnswerPayload struct {
	QuestionId    uint `json:"question_id" validate:"required,gt=0"`
	SelectedIndex *int `json:"selected_index" validate:"required,gte=0"`
}
