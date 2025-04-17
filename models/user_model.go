package models

import "gorm.io/gorm"

type UserRole string

const (
	Student UserRole = "student"
	Teacher UserRole = "teacher"
)

type User struct {
	gorm.Model
	Name          string
	Email         string `gorm:"unique"`
	IdentityToken string
	Phone         string
	Role          UserRole `gorm:"default:teacher"`
}
