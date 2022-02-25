package main

import (
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "data",
		Usage: "chain data",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name: "api-url",
			},
		},
		Commands: []*cli.Command{
			minersCmd,
			sectorsCmd,
		},
	}

	app.Setup()

	if err := app.Run(os.Args); err != nil {
		log.Errorf("cli error: %s", err)
		os.Exit(1)
	}
}
