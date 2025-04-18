package db

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func CreateDatabaseClient(dsn string, maxConn int) (*gorm.DB, error) {
	gormDb, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: true,
	})
	if err != nil {
		return nil, err
	}

	sqlDb, err := gormDb.DB()
	if err != nil {
		return nil, err
	}
	sqlDb.SetMaxIdleConns(maxConn)

	return gormDb, nil
}

func CreateEnums(db *gorm.DB) error {
	result := db.Exec(`
	DO $$ BEGIN
		IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
			CREATE TYPE user_role AS ENUM ('teacher', 'student', 'admin');
		END IF;

		IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quiz_status') THEN
			CREATE TYPE quiz_status AS ENUM ('pending', 'finished');
		END IF;
	END$$;
`)

	return result.Error
}

func Migrate(db *gorm.DB, tables ...any) error {
	for _, table := range tables {
		err := db.AutoMigrate(table)
		if err != nil {
			return fmt.Errorf("table migration error for %v", table)
		}
	}

	return nil
}
