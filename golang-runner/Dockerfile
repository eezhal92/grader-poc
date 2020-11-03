FROM golang:1.12.4

COPY . /runner
WORKDIR /runner
RUN chmod +x golang_exec.sh
ENTRYPOINT ["/runner/golang_exec.sh"]