// BlockHeader
[
    {
        $match: {
            Miner: ctx.Addr,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $limit: ctx.Limit
    }
]
