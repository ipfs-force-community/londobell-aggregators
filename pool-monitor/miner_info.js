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
            Epoch: "$Epoch",
            Miner: "$Addr",
            Owner: "$Info.Owner",
            Worker: "$Info.Worker",
            ControlAddresses: "$Info.ControlAddresses",
            RawBytePower: "$sectorHealth.Detail.ActiveSectorsRawPower",
            QualityAdjPower: "$sectorHealth.Detail.ActiveSectorsQAPower",
            Balance: "$Info.Balance",
            AvailableBalance: "$Info.AvailableBalance",
            VestingFunds: "$Detail.LockedFunds",
            FeeDebt: "$Detail.FeeDebt",
            SectorSize: "$Info.SectorSize",
            SectorCount: "$sectorHealth.Detail.All",
            FaultSectorCount: "$sectorHealth.Detail.Faults",
            ActiveSectorCount: "$sectorHealth.Detail.Active",
            LiveSectorSector: "$sectorHealth.Detail.Live",
            RecoverSectorCount: "$sectorHealth.Detail.Recoveries",
            TerminateSectorCount: "$sectorHealth.Detail.TerminatedSectors",
            PreCommitSectorCount: "$Info.PrecommitSectorCount",
            InitialPledge: "$Detail.InitialPledge",
            PreCommitDeposits: "$Detail.PreCommitDeposits",
            Beneficiary: "$Info.Beneficiary",
            BeneficiaryTerm: "$Info.BeneficiaryTerm",
            PendingBeneficiaryTerm: "$Info.PendingBeneficiaryTerm",
            States: "$Info.State",
            Multiaddrs: "$Info.Multiaddrs",
            PeerID: "$Info.PeerID"
        }
    }
]
