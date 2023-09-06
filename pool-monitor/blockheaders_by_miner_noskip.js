// BlockHeader
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            Miner: {$in: ctx.Addrs}

            // $expr: {
            //     $and: [
            //         {$gte: ["$Epoch", ctx.StartEpoch]},
            //         {$lt: ["$Epoch", ctx.EndEpoch]},
            //         {$in: ["$Miner", ctx.Addrs]}
            //     ]
            // }
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
