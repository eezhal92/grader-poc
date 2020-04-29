FROM node:8.15.0-alpine

COPY . /runner
WORKDIR runner
RUN apk add --no-cache bash
RUN chmod +x nodejs_exec.sh
ENTRYPOINT ["/runner/nodejs_exec.sh"]