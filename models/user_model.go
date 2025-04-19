package models

import (
	"time"

	"gorm.io/gorm"
)

type UserRole string

const (
	Student UserRole = "student"
	Teacher UserRole = "teacher"
	Admin   UserRole = "admin"
)

type User struct {
	ID            uint           `json:"id" gorm:"primarykey"`
	Name          string         `json:"name"`
	Email         string         `json:"email" gorm:"unique"`
	IdentityToken string         `json:"-"`
	Phone         string         `json:"phone"`
	Role          UserRole       `json:"role" gorm:"type:user_role;default:'teacher'"`
	Quizzes       []Quiz         `gorm:"foreignKey:TeacherId"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}
