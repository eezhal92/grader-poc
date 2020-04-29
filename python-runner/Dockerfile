FROM python:3.4-alpine

COPY . /runner
WORKDIR runner
RUN apk add --no-cache bash
RUN chmod +x python_exec.sh
ENTRYPOINT ["/runner/python_exec.sh"]