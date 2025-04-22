package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	StatusQuizInActive = "inactive"
	StatusQuizActive   = "active"
)

type Quiz struct {
	ID                uint           `json:"id" gorm:"primarykey"`
	Title             string         `json:"title"`
	Subject           string         `json:"subject"`
	ShareCode         string         `json:"share_code" gorm:"unique"`
	NoOfQuestions     int            `json:"no_of_questions"`
	Questions         []Question     `json:"questions" gorm:"foreignKey:QuizId;constraint:OnDelete:CASCADE"`
	TeacherId         uint           `json:"teacher_id"`
	Teacher           *User          `json:"-" gorm:"foreignKey:TeacherId;constraint:OnDelete:SET NULL"`
	Status            string         `json:"status" gorm:"type:quiz_status;default:'active'"`
	Duration          time.Duration  `json:"duration"`
	Expiry            time.Time      `json:"-"`
	IsNegativeMarking bool           `json:"is_negative_marking" gorm:"default:false"`
	TotalSubmissions  int            `json:"total_submissions" gorm:"-"`
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
	DeletedAt         gorm.DeletedAt `json:"-" gorm:"index"`
}
