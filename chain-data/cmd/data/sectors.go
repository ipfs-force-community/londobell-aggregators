package main

import (
	"fmt"
	"time"

	"github.com/filecoin-project/go-address"
	"github.com/filecoin-project/go-state-types/abi"
	miner6 "github.com/filecoin-project/specs-actors/v6/actors/builtin/miner"
	"github.com/urfave/cli/v2"

	"github.com/filecoin-project/lotus/blockstore"
	"github.com/filecoin-project/lotus/chain/store"
	cliutil "github.com/filecoin-project/lotus/cli/util"
)

var sectorsCmd = &cli.Command{
	Name:  "sectors",
	Usage: "list sector info",
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

		ts, err := api.ChainHead(cctx.Context)
		if err != nil {
			return err
		}

		maddr, err := address.NewFromString(cctx.String("miner"))
		mact, err := api.StateGetActor(cctx.Context, maddr, ts.Key())
		if err != nil {
			return err
		}

		stor := store.ActorStore(cctx.Context, blockstore.NewAPIBlockstore(api))

		var state miner6.State //todo:版本？
		err = stor.Get(cctx.Context, mact.Head, &state)
		if err != nil {
			return err
		}

		type sectorInfo struct {
			date                    time.Time
			sector_number           abi.SectorNumber
			version                 string
			size                    abi.SectorSize
			activation              abi.ChainEpoch
			expiration              abi.ChainEpoch
			pledge                  abi.TokenAmount
			deal_weight             abi.DealWeight
			verified_deal_weight    abi.DealWeight
			expected_day_reward     abi.TokenAmount
			expected_storage_pledge abi.TokenAmount
			replaced_sector_age     abi.ChainEpoch
			replaced_day_reward     abi.TokenAmount
		}

		err = state.ForEachSector(stor, func(info *miner6.SectorOnChainInfo) {
			sectorinfo := sectorInfo{}
			sectorinfo.date = CalcTimeByEpoch(uint64(info.Expiration))
			sectorinfo.sector_number = info.SectorNumber

			if info.SealProof >= 0 && info.SealProof <= 4 {
				sectorinfo.version = "V1"
			} else {
				sectorinfo.version = "V1_1"
			}

			sectorinfo.size, err = info.SealProof.SectorSize()
			if err != nil {
				return
			}

			sectorinfo.activation = info.Activation
			sectorinfo.expiration = info.Expiration
			sectorinfo.pledge = info.InitialPledge
			sectorinfo.deal_weight = info.DealWeight
			sectorinfo.verified_deal_weight = info.VerifiedDealWeight
			sectorinfo.expected_day_reward = info.ExpectedDayReward
			sectorinfo.expected_storage_pledge = info.ExpectedStoragePledge
			sectorinfo.replaced_sector_age = info.ReplacedSectorAge
			sectorinfo.replaced_day_reward = info.ReplacedDayReward

			fmt.Printf("sector_number(%v):[date:%v,sector_number:%v,version:%v,size:%v,activation:%v,expiration:%v,pledge:%v,deal_weight:%v,verified_deal_weight:%v,expected_day_reward:%v,expected_storage_pledge:%v,replaced_sector_age:%v,replaced_day_reward:%v ]\n",
				sectorinfo.sector_number, sectorinfo.date, sectorinfo.sector_number, sectorinfo.version, sectorinfo.size, sectorinfo.activation, sectorinfo.expiration, sectorinfo.pledge, sectorinfo.deal_weight,
				sectorinfo.verified_deal_weight, sectorinfo.expected_day_reward, sectorinfo.expected_storage_pledge, sectorinfo.replaced_sector_age, sectorinfo.replaced_day_reward)
		})

		return nil
	},
}
