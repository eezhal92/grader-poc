#! /bin/bash
inputs=$(cat /tests/array/in.txt)

echo -e "$inputs" | python /app/main.py
