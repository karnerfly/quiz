package store

import (
	"gorm.io/gorm"
)

type Store struct {
	client *gorm.DB
}

func NewStore(client *gorm.DB) *Store {
	return &Store{client: client}
}
