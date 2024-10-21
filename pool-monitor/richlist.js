// ActorBalance
[
    {
        $match: {
            "Epoch": ctx.StartEpoch,
            "Code" : {$in:["storageminer","account","multisig"]},
            "Balance": {$gt: "0"},
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