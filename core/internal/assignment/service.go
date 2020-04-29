package assignment

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

type AssigmentService struct{}

func NewService() *AssigmentService {
	return &AssigmentService{}
}

type AssigmentPayload struct {
	TestId   string
	Username string
	Runtime  string
	Solution string
}

func getAssigmentFilePath(username string, testId string, runtime string) (string, error) {
	dir := fmt.Sprintf("./data/assigments/%s_%s", username, testId)
	assigmentPath, _ := filepath.Abs(dir)
	if _, err := os.Stat(assigmentPath); !os.IsNotExist(err) {
		// fmt.Println("assignment path exists")
	}
	extensions := map[string]string{
		"nodejs": "js",
		"golang": "go",
		"python": "py",
	}

	if extension, ok := extensions[runtime]; ok {
		assigmentPath += fmt.Sprintf("/main.%s", extension)
		return assigmentPath, nil
	}

	return "", fmt.Errorf("Cannot get file for runtime %s", runtime)
}

func (s *AssigmentService) GetAssigmentTemplate(payload *AssigmentPayload) string {
	path, err := getAssigmentFilePath(payload.Username, payload.TestId, payload.Runtime)

	if err != nil {
		log.Fatal(err)
	}

	content, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}

	template := string(content)

	return template
}

func (s *AssigmentService) UpdateFile(payload *AssigmentPayload) {
	path, err := getAssigmentFilePath(payload.Username, payload.TestId, payload.Runtime)

	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(path, []byte(payload.Solution), 0666)
	if err != nil {
		log.Fatal(err)
	}
}
