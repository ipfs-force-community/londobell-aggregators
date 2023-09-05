// BlockHeader
[
    {
        $match: {
            "Miner": ctx.Addr,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum:1}
        }
    }
]