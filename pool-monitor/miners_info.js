//MinerSectorHealth
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
            Epoch: "$Epoch",
            Miner: "$Addr",
            Owner: "$miner.Info.Owner",
            Worker: "$miner.Info.Worker",
            ControlAddresses: "$miner.Info.ControlAddresses",
            RawBytePower: "$Detail.ActiveSectorsRawPower",
            QualityAdjPower: "$Detail.ActiveSectorsQAPower",
            Balance: "$miner.Info.Balance",
            AvailableBalance: "$miner.Info.AvailableBalance",
            VestingFunds: "$miner.Detail.LockedFunds",
            FeeDebt: "$miner.Detail.FeeDebt",
            SectorSize: "$miner.Info.SectorSize",
            SectorCount: "$Detail.All",
            FaultSectorCount: "$Detail.Faults",
            ActiveSectorCount: "$Detail.Active",
            LiveSectorSector: "$Detail.Live",
            RecoverSectorCount: "$Detail.Recoveries",
            TerminateSectorCount: "$Detail.TerminatedSectors",
            PreCommitSectorCount: "$miner.Info.PrecommitSectorCount",
            InitialPledge: "$miner.Detail.InitialPledge",
            PreCommitDeposits: "$miner.Detail.PreCommitDeposits",
            Beneficiary: "$miner.Info.Beneficiary",
            BeneficiaryTerm: "$miner.Info.BeneficiaryTerm",
            PendingBeneficiaryTerm: "$miner.Info.PendingBeneficiaryTerm",
            States: "$miner.Info.State",
            Multiaddrs: "$miner.Info.Multiaddrs",
            PeerId: "$miner.Info.PeerID",
            UnprovenSectorCount: "$Detail.Unproven"
        }
    }
]
