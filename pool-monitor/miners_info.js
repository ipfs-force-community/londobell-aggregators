[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        }
    },
    {
        $lookup: {
            from: "MinerFunds",
            let: {
                addr: "$Addr",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$Addr", "$$addr"]},
                                    {$eq: ["$Epoch", "$$epoch"]}
                                ]
                            }
                        }
                }
            ],
            as: "miner",
        }
    },
    {
        $unwind: "$miner"
    },
    {
        $project:{
            _id: 0,
            ID: "$miner._id",
            epoch: "$Epoch",
            miner: "$Addr",
            owner: "$miner.Info.Owner",
            worker: "$miner.Info.Worker",
            controllers: "$miner.Info.ControlAddresses",
            power: "$Detail.ActiveSectorsRawPower",
            quality_power: "$Detail.ActiveSectorsQAPower",
            balance: "$miner.Info.Balance",
            available_balance: "$miner.Info.AvailableBalance",
            vesting_funds: "$miner.Detail.LockedFunds",
            fee_debt: "$miner.Detail.FeeDebt",
            sector_size: "$miner.Info.SectorSize",
            sector_count: "$Detail.All",
            fault_sector_count: "$Detail.Faults",
            active_sector_count: "$Detail.Active",
            live_sector_count: "$Detail.Live",
            recover_sector_count: "$Detail.Recoveries",
            terminate_sector_count: "$Detail.TerminatedSectors",
            precommit_sector_count: "$miner.Info.PrecommitSectorCount",
            initial_pledge: "$miner.Detail.InitialPledge",
            pre_commit_deposits: "$miner.Detail.PreCommitDeposits",
            states: "$miner.Info.State"
        }
    }
]
