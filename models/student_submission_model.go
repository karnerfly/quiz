package models

import (
	"time"

	"gorm.io/gorm"
)

type StudentSubmission struct {
	Id             uint            `json:"id" gorm:"primarykey"`
	QuizCode       string          `json:"quiz_code"`
	Name           string          `json:"name"`
	Phone          string          `json:"phone"`
	District       string          `json:"distrcit"`
	SubmissionCode string          `json:"submission_code"`
	Answers        []StudentAnswer `json:"answers" gorm:"foreignKey:SubmissionId;constraint:OnDelete:CASCADE"`
	Score          int             `json:"score"`
	CreatedAt      time.Time       `json:"created_at"`
	UpdatedAt      time.Time       `json:"updated_at"`
	DeletedAt      gorm.DeletedAt  `json:"-" gorm:"index"`
}
