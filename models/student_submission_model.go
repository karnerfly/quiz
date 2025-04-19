package models

import (
	"time"

	"gorm.io/gorm"
)

type StudentSubmission struct {
	Id             uint            `json:"id" gorm:"primarykey"`
	QuizId         uint            `json:"quiz_id"`
	Name           string          `json:"name"`
	Phone          string          `json:"phone"`
	SubmissionCode string          `json:"submission_code"` // To track without accounts
	Answers        []StudentAnswer `json:"answers" gorm:"foreignKey:SubmissionId"`
	Score          int             `json:"score"`
	CreatedAt      time.Time       `json:"created_at"`
	UpdatedAt      time.Time       `json:"updated_at"`
	DeletedAt      gorm.DeletedAt  `json:"-" gorm:"index"`
}
