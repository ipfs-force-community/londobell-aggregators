// BlockHeader
[
    {
        $match: {
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
            _id: "$Miner",
            Count: {$sum: 1},
        }
    },
]