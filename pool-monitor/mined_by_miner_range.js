// BlockHeader
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Miner": ctx.Addr
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum:1}
        }
    }
]