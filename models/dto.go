package models

import "time"

type CreateUserPayload struct {
	Name     string `json:"name" validate:"required,min=4,max=30"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
	Phone    string `json:"phone" validate:"required"`
	Role     string `json:"role,omitempty"`
}

type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=16"`
}

type UserResponsePayload struct {
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Role      string    `json:"role,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
