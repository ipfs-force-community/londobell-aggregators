// ActorBalance
[
    {
        $match: {
            "Epoch": ctx.StartEpoch,
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