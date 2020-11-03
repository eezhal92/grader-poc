package main

import (
	"github.com/code-runner-platform/core/pkg/server"
)

func main() {
	s := server.Build()
	s.Listen(3000)
}
