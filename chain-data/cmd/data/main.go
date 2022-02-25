package main

import (
	"github.com/urfave/cli/v2"
	"os"
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
		},
	}

	app.Setup()

	if err := app.Run(os.Args); err != nil {
		log.Errorf("cli error: %s", err)
		os.Exit(1)
	}
}



//	app := &cli.App{
//		Name:  "data",
//		Usage: "chain data",
//		Flags: []cli.Flag{
//			&cli.StringFlag{
//				Name: "api-url",
//			},
//		},
//		Action: func(cctx *cli.Context) error {
//			api, closer, err := cliutil.GetFullNodeAPI(cctx)
//			if err != nil {
//				return err
//			}
//			defer closer()
//
//			ts, err := api.ChainHead(cctx.Context)
//			if err != nil {
//				return err
//			}
//
//			miners, err := api.StateListMiners(cctx.Context, ts.Key())
//			if err != nil {
//				return err
//			}
//
//			ndm, err := getDealsCounts(cctx.Context, api)
//			if err != nil {
//				return err
//			}
//
//			sort.Slice(miners, func(i, j int) bool {
//				return ndm[miners[i]] > ndm[miners[j]]
//			})
//
//			for i := 0; i < 5 && i < len(miners); i++ {
//				fmt.Printf("%s %d\n", miners[i], ndm[miners[i]])
//			}
//
//			return nil
//		},
//	}
//
//	app.Setup()
//
//	if err := app.Run(os.Args); err != nil {
//		log.Errorf("cli error: %s", err)
//		os.Exit(1)
//	}
//}
//
//func getDealsCounts(ctx context.Context, lapi v0api.FullNode) (map[address.Address]int, error) {
//	allDeals, err := lapi.StateMarketDeals(ctx, types.EmptyTSK)
//	if err != nil {
//		return nil, err
//	}
//
//	out := make(map[address.Address]int)
//	for _, d := range allDeals {
//		if d.State.SectorStartEpoch != -1 {
//			out[d.Proposal.Provider]++
//		}
//	}
//
//	return out, nil
//}
