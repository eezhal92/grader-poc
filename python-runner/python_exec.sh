#! /bin/bash
echo "Python runner is running..."

inputs=$(cat /tests/in.txt)

echo "input:"
echo -e "$inputs"

echo "output:"
echo -e "$inputs" | python /app/main.py
