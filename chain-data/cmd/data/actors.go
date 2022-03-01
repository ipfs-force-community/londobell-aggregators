package main

import (
	"fmt"
	"github.com/filecoin-project/go-address"
	"github.com/filecoin-project/go-state-types/abi"
	"github.com/filecoin-project/lotus/blockstore"
	"github.com/filecoin-project/lotus/chain/actors"
	"github.com/filecoin-project/lotus/chain/actors/builtin/account"
	init_ "github.com/filecoin-project/lotus/chain/actors/builtin/init"
	"github.com/filecoin-project/lotus/chain/actors/builtin/market"
	"github.com/filecoin-project/lotus/chain/actors/builtin/miner"
	"github.com/filecoin-project/lotus/chain/actors/builtin/multisig"
	"github.com/filecoin-project/lotus/chain/actors/builtin/paych"
	"github.com/filecoin-project/lotus/chain/actors/builtin/power"
	"github.com/filecoin-project/lotus/chain/actors/builtin/reward"
	"github.com/filecoin-project/lotus/chain/actors/builtin/system"
	"github.com/filecoin-project/lotus/chain/actors/builtin/verifreg"
	"github.com/filecoin-project/lotus/chain/store"
	"github.com/filecoin-project/lotus/chain/types"
	lcli "github.com/filecoin-project/lotus/cli"
	cliutil "github.com/filecoin-project/lotus/cli/util"
	"github.com/filecoin-project/specs-actors/v6/actors/builtin"
	"github.com/urfave/cli/v2"
)

var actorsCmd = &cli.Command{
	Name: "actors",
	Usage: "list actor info",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:     "actor_id",
			Required: true,
		},
		&cli.Uint64Flag{
			Name:     "epoch",
			Required: true,
		},
		&cli.StringFlag{
			Name:     "tskey",
			Usage: "tipsetkey, Separated by ','",
		},
	},
	Action: func(cctx *cli.Context) error {
		api, closer, err := cliutil.GetFullNodeAPI(cctx)
		if err != nil {
			return err
		}
		defer closer()

		addr, err := address.NewFromString(cctx.String("actor_id"))
		if err != nil {
			return err
		}
		//防止输入非id address

		fmt.Printf("actor_id:\t%v\n", addr)

		tsk := types.EmptyTSK
		if cctx.String("tskey") != "" {
			cids, err := lcli.ParseTipSetString(cctx.String("tskey"))
			if err != nil {
				return err
			}
			tsk = types.NewTipSetKey(cids...)
		}

		ts, err := api.ChainGetTipSetByHeight(cctx.Context, abi.ChainEpoch(cctx.Uint64("epoch")), tsk)
		if err != nil {
			return err
		}

		k, err := api.StateLookupID(cctx.Context, addr, ts.Key())
		if err != nil {
			return err
		}

		fmt.Printf("actor_addr:\t%v\n", k.String())
		fmt.Printf("epoch:\t%v\n", ts.Height())
		fmt.Printf("block_time:\t%v\n", CalcTimeByEpoch(uint64(ts.Height())))

		//builtin0-7版本？
		var actor_type string
		if addr == builtin.BurntFundsActorAddr {
			actor_type = "burnt"
			//没有state？？
		}

		stor := store.ActorStore(cctx.Context, blockstore.NewAPIBlockstore(api))

		act, err := api.StateGetActor(cctx.Context, addr, ts.Key())
		if err != nil {
			return err
		}

		var state interface{}

		switch act.Code {
		case builtin.AccountActorCodeID:
			actor_type = "account"
			st, err := account.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.MultisigActorCodeID:
			actor_type = "multisig"
			st, err := multisig.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.StoragePowerActorCodeID:
			actor_type = "power"
			st, err := power.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.RewardActorCodeID:
			actor_type = "reward"
			st, err := reward.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.InitActorCodeID:
			actor_type = "init"
			st, err := init_.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.StorageMarketActorCodeID:
			actor_type = "market"
			st, err := market.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.VerifiedRegistryActorCodeID:
			actor_type = "verify"
			st, err := verifreg.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.SystemActorCodeID:
			//system没有state？？
			actor_type = "system"
			st, err := system.MakeState(stor, actors.Version7) //actor版本？？
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.StorageMinerActorCodeID:
			actor_type = "miner"
			st, err := miner.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		case builtin.PaymentChannelActorCodeID:
			actor_type = "paych"
			st, err := paych.Load(stor, act)
			if err != nil {
				return err
			}
			state = st.GetState()
		}

		fmt.Printf("actor_type:\t%v\n",actor_type)
		fmt.Printf("balance:\t%v\n",act.Balance)
		fmt.Printf("code:\t%v\n",act.Code)
		fmt.Printf("head:\t%v\n",act.Head)
		fmt.Printf("state:\t%v\n",state)

		return nil
	},
}