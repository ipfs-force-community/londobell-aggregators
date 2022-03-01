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
			epochCmd,
			actorsCmd,
		},
		//Action: func(cctx *cli.Context) error {
		//	api, closer, err := lcli.GetFullNodeAPI(cctx)
		//	if err != nil {
		//		return err
		//	}
		//	defer closer()
		//
		//	ts, err := api.ChainHead(cctx.Context)
		//	if err != nil {
		//		return err
		//	}
		//
		//	actors, err := api.StateListActors(cctx.Context, ts.Key())
		//	if err != nil {
		//		return err
		//	}
		//
		//	i := 0
		//	for _, a := range actors {
		//		if i == 30 {
		//			return nil
		//		}
		//		i++
		//		fmt.Println(a.String())
		//	}
		//
		//	return nil
		//
		//},
	}

	app.Setup()

	if err := app.Run(os.Args); err != nil {
		log.Errorf("cli error: %s", err)
		os.Exit(1)
	}
}
