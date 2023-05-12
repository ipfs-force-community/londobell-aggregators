// BlockHeader
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Miner": {$in: [ctx.Addrs]}
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum:1}
        }
    }
]