// 出块miners
// BlockHeader
[
    {
        $match: {
            "Miner": ctx.Addr, // todo: b.Miner可能不是ID地址
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $project: {
            _id: 0,
            Miner: "$Miner",
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1},
        }
    },
]