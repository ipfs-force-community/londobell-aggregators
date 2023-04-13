// ActorBalance
[
    {
        $match: {
            "Epoch": ctx.StartEpoch,
            "Balance": {$ne: "0"}
        }
    },
    {
        $addFields: {
            balance: {$toDecimal: "$Balance"}
        }
    },
    {
        $sort: {
            "balance": -1,
        }
    },
    {
        $limit: 1000
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]