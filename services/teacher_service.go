package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/karnerfly/quiz/constants"
	"github.com/karnerfly/quiz/models"
	"github.com/karnerfly/quiz/models/dto"
	"github.com/karnerfly/quiz/pkg"
	"github.com/karnerfly/quiz/store"
)

type TeacherService struct {
	store *store.Store
}

func NewTeacherService(userStore *store.Store) *TeacherService {
	return &TeacherService{store: userStore}
}

func (s *TeacherService) CreateNewTeacher(ctx context.Context, payload dto.CreateTeacherPayload) (uint, error) {
	encryptor := pkg.Encrypter{}

	encryptedToken, err := encryptor.Encrypt([]byte(payload.Email), encryptor.HashKey([]byte(payload.Password)))
	if err != nil {
		return 0, err
	}

	user := models.User{
		Name:          payload.Name,
		Email:         payload.Email,
		IdentityToken: encryptedToken,
		Phone:         payload.Phone,
		Role:          models.Teacher,
	}

	id, err := s.store.CreateUser(ctx, user)

	if err != nil {
		if errors.Is(err, constants.ErrRecordAlreadyExists) {
			return 0, fmt.Errorf("email %s is already registered: %w", payload.Email, err)
		}

		return 0, err
	}

	return id, err
}

func (s *TeacherService) GetCurrentTeacher(ctx context.Context, id uint) (models.User, error) {
	user, err := s.store.GetUserById(ctx, id)
	if err != nil {
		if errors.Is(err, constants.ErrRecordDoesNotExists) {
			return models.User{}, fmt.Errorf("user does not exists: %w", err)
		}

		return models.User{}, err
	}

	return user, nil
}

func (s *TeacherService) GetAllQuizzesByTeacherId(ctx context.Context, teacherId uint) ([]models.Quiz, error) {
	return s.store.GetAllQuizzesByTeacherId(ctx, teacherId)
}

func (s *TeacherService) GetAllSubmissionsByTeacherId(ctx context.Context, quizId uint, teacherId uint) ([]models.StudentSubmission, error) {
	// owner, err := s.store.IsQuizOwner(ctx, quizId, teacherId)
	// if err != nil {
	// 	return nil, err
	// }

	// if !owner {
	// 	return nil, constants.ErrRecordDoesNotExists
	// }

	return s.store.GetAllSubmissionsByTeacherId(ctx, teacherId)
}
