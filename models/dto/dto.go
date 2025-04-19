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
	Duration      int               `json:"duration" validate:"required,oneof=15 30 60 90 120 180"`
	Questions     []QuestionPayload `json:"questions" validate:"required,min=1,dive"`
	Expiry        time.Time         `json:"expiry"`
	Rule          RulePayload       `json:"rule"`
}

type RulePayload struct {
	IsNegativeMarking bool `json:"is_negative_marking"`
}

type QuestionPayload struct {
	Problem        string   `json:"problem" validate:"required"`
	Options        []string `json:"options" validate:"required,min=2,dive,required"`
	CorrectAnswers []uint   `json:"correct_answers" validate:"required,min=1,dive"`
}
