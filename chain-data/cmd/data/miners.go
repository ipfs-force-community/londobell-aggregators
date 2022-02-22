package main

import "github.com/urfave/cli/v2"

var minersCmd = &cli.Command{
	Name:  "miners",
	Usage: "list miner info",
	Flags: []cli.Flag{},
}
