package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	StatusStudentResponsePending  = "pending"
	StatusStudentResponseFinished = "finished"
)

type StudentSubmission struct {
	Id             uint            `json:"id" gorm:"primarykey"`
	QuizId         uint            `json:"-"`
	Name           string          `json:"name"`
	Phone          string          `json:"phone"`
	Status         string          `json:"status" gorm:"type:student_response_status;default:'pending'"`
	SubmissionCode string          `json:"submission_code"` // To track without accounts
	Answers        []StudentAnswer `json:"answers" gorm:"foreignKey:SubmissionId"`
	Score          int             `json:"score"`
	CreatedAt      time.Time       `json:"created_at"`
	UpdatedAt      time.Time       `json:"updated_at"`
	DeletedAt      gorm.DeletedAt  `json:"-" gorm:"index"`
}
