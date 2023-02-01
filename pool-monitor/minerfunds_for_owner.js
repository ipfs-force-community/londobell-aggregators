// MinerFunds
// todo: for miners
[
    {
        $match: {
            "Info.Owner": ctx.Addr,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch
            }
        }
    },
    {
        $group: {
            _id: "$Info.Owner",
            Addrs: {$addToSet: "$Addr"}
        }
    },
    {
        $lookup: {
            from: "MinerFunds",
            let: {addrs: "$Addrs"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$in: ["$Addr", "$$addrs"]},
                            ]
                        }
                    }
                }
            ],
            as: "minerfunds",
        }
    },
    {
        $unwind: "$minerfunds"
    },
    {
        $sort: {
            "minerfunds.Epoch": -1
        }
    },
    {
        $group: {
            _id: "$minerfunds.Addr",
            funds: {
                $first: "$$ROOT"
            }
        }
    },
    {
        $group: {
            _id: "$funds._id",
            availableBalance: {$sum: {$toDecimal: "$funds.minerfunds.Info.AvailableBalance"}},
            initialPledge: {$sum: {$toDecimal: "$funds.minerfunds.Detail.InitialPledge"}},
            preCommitDeposits: {$sum: {$toDecimal: "$funds.minerfunds.Detail.PreCommitDeposits"}},
            lockedFunds: {$sum: {$toDecimal: "$funds.minerfunds.Detail.LockedFunds"}},
        }
    }
]
