// MinerFunds hourly
[
    {
        $match: {
            Addr: ctx.Addr,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
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