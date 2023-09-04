// BlockHeader
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            Miner: ctx.Addr
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
