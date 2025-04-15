all: clean build execute

build:
	@go build -o bin/main ./cmd/main/main.go

execute:
	@./bin/main

run:
	@go run ./cmd/main

clean:
	@$(RM) -r bin