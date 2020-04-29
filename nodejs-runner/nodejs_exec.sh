#! /bin/bash
echo "Runner NodeJS is running..."

inputs=$(cat /tests/in.txt)

echo "input:"
echo -e "$inputs"

echo "output:"
echo -e "$inputs" | node /app/main.js
