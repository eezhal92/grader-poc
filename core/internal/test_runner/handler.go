package test_runner

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func getImageName(language string) (string, error) {
	langMap := map[string]string{
		"golang": "cr-golang-runner:v1",
		"nodejs": "cr-nodejs-runner:v1",
		"python": "cr-python-runner:v1",
	}

	if imageName, ok := langMap[language]; ok {
		return imageName, nil
	}

	return "", fmt.Errorf("Languange %s is not available", language)
}

func getAssigmentPath(username string, testId string) string {
	dir := fmt.Sprintf("./data/assigments/%s_%s", username, testId)
	assigmentPath, _ := filepath.Abs(dir)
	if _, err := os.Stat(assigmentPath); !os.IsNotExist(err) {
		// fmt.Println("assignment path exists")
	}

	return assigmentPath
}

func getTestPath(testId string) string {
	dir := fmt.Sprintf("./data/tests/%s", testId)
	testPath, _ := filepath.Abs(dir)
	if _, err := os.Stat(testPath); !os.IsNotExist(err) {
		// fmt.Println("tests path exists")
	}

	return testPath
}

func createDockerRunArgs(p *RunTestPayload) []string {
	assigmentVolumePath := fmt.Sprintf("%s:/app:rw", getAssigmentPath(p.Username, p.TestId))
	testVolumePath := fmt.Sprintf("%s:/tests:rw", getTestPath(p.TestId))
	imageName, _ := getImageName(p.Runtime)

	args := []string{
		"run",
		"--rm",
		fmt.Sprintf("-v=%s", assigmentVolumePath),
		fmt.Sprintf("-v=%s", testVolumePath),
		imageName,
	}

	return args
}

func execDockerCommand(args []string) string {
	cmd := exec.Command("docker", args...)

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	_ = cmd.Run()

	result := ""
	outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
	if outStr != "" {
		result += outStr
		fmt.Printf("%s\n", outStr)
	}

	if errStr != "" {
		result += errStr
		fmt.Printf("%s\n", errStr)
	}

	return result
}

func Execute(payload *RunTestPayload) string {
	args := createDockerRunArgs(payload)

	fmt.Println(args)

	return execDockerCommand(args)
}
