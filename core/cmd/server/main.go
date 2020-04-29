package main

import (
	"github.com/padepokan/core/pkg/server"
)

func main() {
	s := server.Build()
	s.Listen(3000)
}
