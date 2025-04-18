package models

import "time"

type CreateUserPayload struct {
	Name     string `json:"name" validate:"required,min=4,max=30"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
	Phone    string `json:"phone" validate:"required"`
	Role     string `json:"role,omitempty"`
}

type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
}

type UserResponsePayload struct {
	Id        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Role      string    `json:"role,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type RulePayload struct {
	IsNegativeMarking bool `json:"is_negative_marking"`
}

type CreateQuizPayload struct {
	Title         string      `json:"title" validate:"required"`
	Subject       string      `json:"subject" validate:"required"`
	NoOfQuestions int         `json:"no_of_questions" validate:"required,min=1,max=100"`
	Duration      int         `json:"duration" validate:"required,oneof=30 60 120 180"`
	Expiry        time.Time   `json:"expiry"`
	Rule          RulePayload `json:"rule"`
}

type AddQuestionPayload struct {
	QuizId  uint
	Problem string   `json:"problem" validate:"required"`
	Options []string `json:"options" validate:"required,min=2,dive,required"`
	Answers []uint   `json:"answers" validate:"required,min=1,dive"`
}

type QuizResponse struct {
	ID                   uint          `json:"id"`
	Title                string        `json:"title"`
	Subject              string        `json:"subject"`
	NoOfQuestions        int           `json:"no_of_questions"`
	CurrentQuestionCount int           `json:"current_question_count"`
	Duration             time.Duration `json:"duration"`
	Expiry               time.Time     `json:"expiry"`
	Status               QuizStaus     `json:"status"`
	Questions            []Question    `json:"questions"`
}

type QuestionResponse struct {
	ID      uint     `json:"id"`
	Problem string   `json:"problem"`
	Options []string `json:"options"`
	Answers []uint   `json:"answers"`
}
