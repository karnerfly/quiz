all: clean build execute

build:
	@go build -o bin/main .

execute:
	@./bin/main

run:
	@go run .

clean:
	@$(RM) -r bin