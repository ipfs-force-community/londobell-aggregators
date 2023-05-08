// BlockHeader
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$in: ["$Miner", ctx.Addrs]}
                ]
            }
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]
