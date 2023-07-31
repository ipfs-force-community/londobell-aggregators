// MinerFunds
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            Addr: ctx.Addr,
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $group: {
            _id: 0,
            start: {
                $first: "$$ROOT",
            },
            end: {
                $last: "$$ROOT",
            }
        }
    },
    {
        $addFields:{
            InitialPledgeDiff: {$subtract: [{$toDecimal: "$end.Detail.InitialPledge"}, {$toDecimal: "$start.Detail.InitialPledge"}]},
            PreCommitDepositsDiff: {$subtract: [{$toDecimal: "$end.Detail.PreCommitDeposits"}, {$toDecimal: "$start.Detail.PreCommitDeposits"}]},
            LockedFundsDiff: {$subtract: [{$toDecimal: "$end.Detail.LockedFunds"}, {$toDecimal: "$start.Detail.LockedFunds"}]},
        }
    }
]