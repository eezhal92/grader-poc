.PHONY: noop

noop:
	echo "noop"

build_runners:
	docker build -t cr-python-runner:v1 ./python-runner --no-cache
	docker build -t cr-golang-runner:v1 ./golang-runner --no-cache
	docker build -t cr-nodejs-runner:v1 ./nodejs-runner --no-cache
