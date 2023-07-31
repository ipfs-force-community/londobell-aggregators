// MinerFunds
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr,
        }
    },
    {
        $project: {
            Epoch: "$Epoch",
            PreCommitDeposits: "$Detail.PreCommitDeposits",
            LockedFunds: "$Detail.LockedFunds",
            FeeDebt: "$Detail.FeeDebt",
            InitialPledge: "$Detail.InitialPledge",
            AvailableBalance: "$Info.AvailableBalance"
        }
    }
]