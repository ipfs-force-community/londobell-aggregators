package main

import (
	"fmt"

	"github.com/filecoin-project/go-state-types/big"
	"github.com/filecoin-project/lotus/blockstore"
	"github.com/filecoin-project/lotus/chain/actors/builtin/power"
	"github.com/filecoin-project/lotus/chain/actors/builtin/reward"
	"github.com/filecoin-project/lotus/chain/state"
	"github.com/filecoin-project/lotus/chain/store"
	"github.com/filecoin-project/lotus/chain/types"
	cliutil "github.com/filecoin-project/lotus/cli/util"
	power6 "github.com/filecoin-project/specs-actors/v6/actors/builtin/power"
	reward6 "github.com/filecoin-project/specs-actors/v6/actors/builtin/reward"
	"github.com/urfave/cli/v2"
)

var epochCmd = &cli.Command{
	Name:  "epoch",
	Usage: "list epoch info",
	Action: func(cctx *cli.Context) error {
		api, closer, err := cliutil.GetFullNodeAPI(cctx)
		if err != nil {
			return err
		}
		defer closer()

		ts, err := api.ChainHead(cctx.Context)
		if err != nil {
			return err
		}

		fmt.Printf("cids:\t%v\n", ts.Cids())
		fmt.Printf("parents:\t%v\n", ts.Parents())
		fmt.Printf("epoch:\t%v\n", ts.Height())
		fmt.Printf("block_time:\t%v\n", CalcTimeByEpoch(uint64(ts.Height())))
		fmt.Printf("block_count:\t%v\n", len(ts.Blocks()))

		var win_count int64 = 0
		for _, b := range ts.Blocks() {
			win_count += b.ElectionProof.WinCount
		}
		fmt.Printf("win_count:\t%v\n", win_count)

		pact, err := api.StateGetActor(cctx.Context, power.Address, ts.Key())
		if err != nil {
			return err
		}

		stor := store.ActorStore(cctx.Context, blockstore.NewAPIBlockstore(api))

		var pst power6.State
		err = stor.Get(cctx.Context, pact.Head, &pst)
		if err != nil {
			return err
		}

		fmt.Printf("net_power:\t%v\n", pst.TotalRawBytePower)
		fmt.Printf("net_quality_power:\t%v\n", pst.TotalQualityAdjPower)

		var rst reward6.State
		ract, err := api.StateGetActor(cctx.Context, reward.Address, ts.Key())
		if err != nil {
			return err
		}

		err = stor.Get(cctx.Context, ract.Head, &rst)
		if err != nil {
			return err
		}
		currentTotalStoragePowerReward := rst.TotalStoragePowerReward

		var prst reward6.State
		parentTs, err := api.ChainGetTipSet(cctx.Context, types.NewTipSetKey(ts.Blocks()[0].Parents...))
		if err != nil {
			return err
		}

		parentRoot := parentTs.ParentState()
		parentTree, err := state.LoadStateTree(stor, parentRoot)
		if err != nil {
			return err
		}

		pract, err := parentTree.GetActor(reward.Address)
		if err != nil {
			return err
		}

		err = stor.Get(cctx.Context, pract.Head, &prst)
		if err != nil {
			return err
		}

		parentTotalStoragePowerReward := prst.TotalStoragePowerReward

		net_rewards := big.Sub(currentTotalStoragePowerReward, parentTotalStoragePowerReward)
		fmt.Printf("net_rewards:\t%v\n", net_rewards)
		fmt.Printf("base_fee:\t%v\n", ts.Blocks()[0].ParentBaseFee)
		fmt.Printf("source:\t%v\n", "api")

		return nil
	},
}
