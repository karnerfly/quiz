package pkg

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"io"
)

type Encrypter struct {
}

func (e Encrypter) HashKey(key string) [32]byte {
	return sha256.Sum256([]byte(key))
}

func (e Encrypter) Encrypt(sub []byte, key [32]byte) []byte {
	block, err := aes.NewCipher(key[:])
	if err != nil {
		return nil
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil
	}

	nonce := make([]byte, gcm.NonceSize())

	_, err = io.ReadFull(rand.Reader, nonce)
	if err != nil {
		return nil
	}

	nonce = gcm.Seal(nonce, nonce, sub, nil)

	return nonce
}

func (e Encrypter) EncodeToBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

func (e Encrypter) DecodeFromBase64(data string) []byte {
	encodedBytes, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return nil
	}
	return encodedBytes
}
