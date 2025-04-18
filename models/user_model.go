package models

import "gorm.io/gorm"

type UserRole string

const (
	Student UserRole = "student"
	Teacher UserRole = "teacher"
	Admin   UserRole = "admin"
)

type User struct {
	gorm.Model
	Name          string
	Email         string `gorm:"unique"`
	IdentityToken string
	Phone         string
	Role          UserRole `gorm:"type:user_role;default:'teacher'"`
	Quizzes       []Quiz   `gorm:"foreignKey:HostId"`
}
