package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"gorm.io/gorm"
)

type StringSlice []string
type UintSlice []uint

// Value converts StringSlice to JSON-encoded value
func (s StringSlice) Value() (driver.Value, error) {
	if s == nil {
		return "[]", nil
	}
	return json.Marshal(s)
}

// Scan converts JSON-encoded value to StringSlice
func (s *StringSlice) Scan(value interface{}) error {
	if value == nil {
		*s = nil
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to scan StringSlice: value is not []byte")
	}
	if len(bytes) == 0 {
		*s = StringSlice{}
		return nil
	}
	return json.Unmarshal(bytes, s)
}

// Value converts UintSlice to JSON-encoded value
func (u UintSlice) Value() (driver.Value, error) {
	if u == nil {
		return "[]", nil
	}
	return json.Marshal(u)
}

// Scan converts JSON-encoded value to UintSlice
func (u *UintSlice) Scan(value interface{}) error {
	if value == nil {
		*u = nil
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to scan UintSlice: value is not []byte")
	}
	if len(bytes) == 0 {
		*u = UintSlice{}
		return nil
	}
	return json.Unmarshal(bytes, u)
}

type Question struct {
	gorm.Model
	QuizId  uint
	Problem string
	Options StringSlice `gorm:"type:jsonb"`
	Answers UintSlice   `gorm:"type:jsonb"`
}
