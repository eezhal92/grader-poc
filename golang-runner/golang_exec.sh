#! /bin/bash
echo "Runner Golang is running..."

inputs=$(cat /tests/in.txt)

echo "input:"
echo -e "$inputs"

echo "output:"
echo -e "$inputs" | go run /app/main.go
