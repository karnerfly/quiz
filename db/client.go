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

func Migrate(db *gorm.DB, tables ...any) error {
	for _, table := range tables {
		err := db.AutoMigrate(table)
		if err != nil {
			return fmt.Errorf("table migration error for %v", table)
		}
	}

	return nil
}
