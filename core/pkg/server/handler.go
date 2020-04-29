package server

import (
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/padepokan/core/internal/assignment"
	runner "github.com/padepokan/core/internal/test_runner"
)

type submitRequest struct {
	TestId   string `json:"testId"`
	Username string `json:"username"`
	Runtime  string `json:"runtime"`
	Solution string `json:"solution"`
}

type templateResponse struct {
	Template string `json:"template"`
}

type submitResponse struct {
	Result string `json:"result"`
}

func Build() *fiber.App {
	app := fiber.New()

	app.Use(cors.New())

	srv := assignment.NewService()

	// Getting assigment template
	// Params: username, runtime, testid
	app.Get("/test", func(c *fiber.Ctx) {
		// check
		payload := new(assignment.AssigmentPayload)
		payload.Runtime = c.Query("runtime")
		payload.TestId = c.Query("testId")
		payload.Username = c.Query("username")

		template := srv.GetAssigmentTemplate(payload)
		c.JSON(templateResponse{template})
	})

	// Submit assigment template
	// Params: username, runtime, testid, body
	app.Post("/submit", func(c *fiber.Ctx) {
		payload := new(submitRequest)

		// Parse body into struct
		if err := c.BodyParser(payload); err != nil {
			c.Status(400).Send(err)
			return
		}

		p := &assignment.AssigmentPayload{
			TestId:   payload.TestId,
			Runtime:  payload.Runtime,
			Username: payload.Username,
			Solution: payload.Solution,
		}

		srv.UpdateFile(p)

		result := runner.Execute(&runner.RunTestPayload{
			Runtime:  payload.Runtime,
			TestId:   payload.TestId,
			Username: payload.Username,
		})

		c.JSON(submitResponse{result})
	})

	return app
}
