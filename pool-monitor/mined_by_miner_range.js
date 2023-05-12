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
            count: {$sum:1}
        }
    }
]