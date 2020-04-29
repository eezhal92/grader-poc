.PHONY: noop

noop:
	echo "noop"

build_runners:
	docker build -t padepokan-python-runner:v1 ./python-runner --no-cache
	docker build -t padepokan-golang-runner:v1 ./golang-runner --no-cache
	docker build -t padepokan-nodejs-runner:v1 ./nodejs-runner --no-cache
