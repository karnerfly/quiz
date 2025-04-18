package models

import (
	"time"

	"gorm.io/gorm"
)

type QuizStaus string

const (
	StatusPending  = "pending"
	StatusFinished = "finished"
)

type Rules struct {
	IsNegativeMarking bool `gorm:"default:false"`
}

type Quiz struct {
	gorm.Model
	Title                string
	Subject              string
	NoOfQuestions        int
	CurrentQuestionCount int
	Questions            []Question `gorm:"foreignKey:QuizId"`
	HostId               uint
	Host                 *User     `gorm:"foreignKey:HostId;constraint:OnDelete:SET NULL"`
	Status               QuizStaus `gorm:"type:quiz_status;default:'pending'"`
	Duration             time.Duration
	Expiry               time.Time
	Rule                 Rules `gorm:"embedded"`
}
