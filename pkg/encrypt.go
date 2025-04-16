package pkg

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
)

type Encrypter struct {
}

func (e Encrypter) HashKey(key []byte) [32]byte {
	return sha256.Sum256(key)
}

func (e Encrypter) Encrypt(data []byte, key [32]byte) (string, error) {
	block, err := aes.NewCipher(key[:])
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())

	_, err = io.ReadFull(rand.Reader, nonce)
	if err != nil {
		return "", err
	}

	nonce = gcm.Seal(nonce, nonce, data, nil)

	return e.EncodeToHex(nonce), nil
}

func (e Encrypter) Decrypt(encryptedData string, key [32]byte) (string, error) {
	encryptedDataBytes, err := e.DecodeFromHex(encryptedData)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key[:])
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := gcm.NonceSize()

	if len(encryptedDataBytes) < nonceSize {
		return "", fmt.Errorf("invalid encrypted data bytes")
	}

	nonce := encryptedDataBytes[:nonceSize]
	ciphertext := encryptedDataBytes[nonceSize:]

	text, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(text), nil
}

func (e Encrypter) EncodeToBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

func (e Encrypter) DecodeFromBase64(data string) ([]byte, error) {
	encodedBytes, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return nil, err
	}
	return encodedBytes, nil
}

func (e Encrypter) EncodeToHex(data []byte) string {
	return hex.EncodeToString(data)
}

func (e Encrypter) DecodeFromHex(data string) ([]byte, error) {
	return hex.DecodeString(data)
}
