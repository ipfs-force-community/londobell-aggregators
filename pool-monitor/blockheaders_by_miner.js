// BlockHeader
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Miner", ctx.Addr]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
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
