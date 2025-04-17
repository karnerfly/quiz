package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name          string
	Email         string `gorm:"unique"`
	Sub           string `gorm:"unique"`
	IdentityToken string
}
