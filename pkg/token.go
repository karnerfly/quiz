package pkg

import (
	"crypto/rand"
	"encoding/hex"
)

func CreateUniqueSub() (string, error) {
	data := make([]byte, 20)
	_, err := rand.Read(data)
	if err != nil {
		return "", err
	}

	return hex.EncodeToString(data), nil
}
