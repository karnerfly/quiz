package models

import (
	"time"

	"gorm.io/gorm"
)

type Question struct {
	ID            uint           `json:"id" gorm:"primarykey"`
	QuizId        uint           `json:"-"`
	Problem       string         `json:"problem"`
	Options       []string       `json:"options" gorm:"serializer:json"`
	CorrectAnswer int            `json:"-"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}
