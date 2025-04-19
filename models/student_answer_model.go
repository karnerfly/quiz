package models

import (
	"time"

	"gorm.io/gorm"
)

type StudentAnswer struct {
	Id            uint           `json:"id" gorm:"primarykey"`
	SubmissionId  uint           `json:"submission_id" gorm:"uniqueIndex:idx_response_question"`
	QuestionId    uint           `json:"question_id" gorm:"uniqueIndex:idx_response_question"`
	SelectedIndex int            `json:"selected_index"`
	IsCorrect     bool           `json:"is_correct"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}
