package test_runner

type RunTestPayload struct {
	Runtime  string `json:"runtime"`
	Username string `json:"username"`
	TestId   string `json:"testId"`
}
