// MinerFunds
[
    {
        $match: {
            "Epoch":  ctx.StartEpoch,
            "Addr": ctx.Addr,
        }
    },
    {
        $lookup: {
            from: "MinerSectorHealth",
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
            as: "sectorHealth",
        }
    },
    {
        $unwind: "$sectorHealth"
    }, // todo: minerfunds has, sectorhealth has not?
    {
        $project:{
            _id: 0,
            ID: "$_id",
            epoch: "$Epoch",
            miner: "$Addr",
            owner: "$Info.Owner",
            worker: "$Info.Worker",
            controllers: "$Info.ControlAddresses",
            power: "$sectorHealth.Detail.ActiveSectorsRawPower",
            quality_power: "$sectorHealth.Detail.ActiveSectorsQAPower",
            balance: "$Info.Balance",
            available_balance: "$Info.AvailableBalance",
            vesting_funds: "$Detail.LockedFunds",
            fee_debt: "$Detail.FeeDebt",
            sector_size: "$Info.SectorSize",
            sector_count: "$sectorHealth.Detail.All",
            fault_sector_count: "$sectorHealth.Detail.Faults",
            active_sector_count: "$sectorHealth.Detail.Active",
            live_sector_count: "$sectorHealth.Detail.Live",
            recover_sector_count: "$sectorHealth.Detail.Recoveries",
            terminate_sector_count: "$sectorHealth.Detail.TerminatedSectors",
            precommit_sector_count: "$Info.PrecommitSectorCount",
            initial_pledge: "$Detail.InitialPledge",
            pre_commit_deposits: "$Detail.PreCommitDeposits",
            beneficiary: "$Info.Beneficiary",
            beneficiary_term: "$Info.BeneficiaryTerm",
            pending_beneficiary_term: "$Info.PendingBeneficiaryTerm",
            states: "$Info.State",
            multiaddrs: "$Info.Multiaddrs",
            peer_id: "$Info.PeerId"
        }
    }
]
