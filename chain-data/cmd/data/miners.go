package main

import (
	"fmt"

	"github.com/filecoin-project/go-address"
	"github.com/filecoin-project/lotus/blockstore"
	"github.com/filecoin-project/lotus/chain/actors/builtin"
	"github.com/filecoin-project/lotus/chain/actors/builtin/miner"
	"github.com/filecoin-project/lotus/chain/store"
	cliutil "github.com/filecoin-project/lotus/cli/util"
	mbuiltin "github.com/filecoin-project/specs-actors/v6/actors/builtin"
	miner6 "github.com/filecoin-project/specs-actors/v6/actors/builtin/miner"
	"github.com/filecoin-project/specs-actors/v7/actors/util/adt"
	"github.com/urfave/cli/v2"
	"golang.org/x/xerrors"
)

var minersCmd = &cli.Command{
	Name:  "miners",
	Usage: "list miner info",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:     "miner",
			Required: true,
		},
	},
	Action: func(cctx *cli.Context) error {
		api, closer, err := cliutil.GetFullNodeAPI(cctx)
		if err != nil {
			return err
		}
		defer closer()

		maddr, err := address.NewFromString(cctx.String("miner"))
		ts, err := api.ChainHead(cctx.Context)
		if err != nil {
			return err
		}
		fmt.Printf("epoch:\t%v\n", ts.Height())

		mi, err := api.StateMinerInfo(cctx.Context, maddr, ts.Key()) //ts
		if err != nil {
			return err
		}

		fmt.Printf("owner:\t%s\n", mi.Owner)
		fmt.Printf("worker:\t%s\n", mi.Worker)
		controllers := make([]address.Address, 0)
		for _, controlAddress := range mi.ControlAddresses {
			controllers = append(controllers, controlAddress)
		}
		fmt.Printf("controllers:\t%v\n", controllers)
		fmt.Printf("sector_size:\t%v\n", mi.SectorSize)

		power, err := api.StateMinerPower(cctx.Context, maddr, ts.Key())
		if err != nil {
			return err
		}
		fmt.Printf("power:\t%v\n", power.MinerPower.RawBytePower)
		fmt.Printf("quality_power:\t%v\n", power.MinerPower.QualityAdjPower)

		mact, err := api.StateGetActor(cctx.Context, maddr, ts.Key())
		if err != nil {
			return err
		}

		fmt.Printf("balance:\t%v\n", mact.Balance) //钱用什么为单位？

		if !builtin.IsStorageMinerActor(mact.Code) {
			return xerrors.New("provided address does not correspond to a miner actor")
		}

		availableBalance, err := api.StateMinerAvailableBalance(cctx.Context, maddr, ts.Key())
		if err != nil {
			return xerrors.Errorf("getting miner available balance: %w", err)
		}

		fmt.Printf("available_balance:\t%v\n", availableBalance)

		stor := store.ActorStore(cctx.Context, blockstore.NewAPIBlockstore(api))
		mas, err := miner.Load(stor, mact)
		if err != nil {
			return err
		}

		lockedFunds, err := mas.LockedFunds()
		if err != nil {
			return err
		}

		fmt.Printf("vesting_funds:\t%v\n", lockedFunds.VestingFunds)
		fmt.Printf("locked_funds:\t%v\n", lockedFunds.PreCommitDeposits) //不算init_pledge?
		fmt.Printf("initial_pledge_requirement:\t%v\n", lockedFunds.InitialPledgeRequirement)

		var state miner6.State
		err = stor.Get(cctx.Context, mact.Head, &state)
		if err != nil {
			return err
		}

		fmt.Printf("states:\t%v\n", state)

		var (
			sector_count           = uint64(0)
			fault_sector_count     = uint64(0)
			active_sector_count    = uint64(0)
			live_sector_count      = uint64(0)
			recover_sector_count   = uint64(0)
			terminate_sector_count = uint64(0)
			precommit_sector_count = uint64(0)
		)

		dls, err := state.LoadDeadlines(stor)
		if err != nil {
			return err
		}
		err = dls.ForEach(stor, func(dlIdx uint64, dl *miner6.Deadline) error {
			partitions, err := dl.PartitionsArray(stor)
			if err != nil {
				return err
			}
			var part miner6.Partition
			return partitions.ForEach(&part, func(partIdx int64) error {
				sc, err := part.Sectors.Count()
				if err != nil {
					return err
				}
				sector_count += sc

				fc, err := part.Faults.Count()
				if err != nil {
					return err
				}
				fault_sector_count += fc

				active, err := part.ActiveSectors()
				if err != nil {
					return err
				}
				ac, err := active.Count()
				if err != nil {
					return err
				}
				active_sector_count += ac

				live, err := part.LiveSectors()
				if err != nil {
					return err
				}
				lc, err := live.Count()
				if err != nil {
					return err
				}
				live_sector_count += lc

				rc, err := part.Recoveries.Count()
				if err != nil {
					return err
				}
				recover_sector_count += rc

				tc, err := part.Terminated.Count()
				if err != nil {
					return err
				}
				terminate_sector_count += tc

				return nil
			})
		})

		precommitted, err := adt.AsMap(stor, state.PreCommittedSectors, mbuiltin.DefaultHamtBitwidth)
		var precommit miner6.SectorPreCommitOnChainInfo
		precommitted.ForEach(&precommit, func(string) error {
			precommit_sector_count++
			return nil
		})

		fmt.Printf("sector_count:\t%v\n", sector_count)
		fmt.Printf("fault_sector_count:\t%v\n", fault_sector_count)
		fmt.Printf("active_sector_count:\t%v\n", active_sector_count)
		fmt.Printf("live_sector_count:\t%v\n", live_sector_count)
		fmt.Printf("recover_sector_count:\t%v\n", recover_sector_count)
		fmt.Printf("terminate_sector_count:\t%v\n", terminate_sector_count)
		fmt.Printf("precommit_sector_count:\t%v\n", precommit_sector_count)

		if err != nil {
			return err
		}
		return nil
	},
}
