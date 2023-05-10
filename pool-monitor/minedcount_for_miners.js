// 出块miners
// BlockHeader
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},

            // $expr: {
            //     $and: [
            //         {$gte: ["$Epoch", ctx.StartEpoch]},
            //         {$lt: ["$Epoch", ctx.EndEpoch]},
            //     ]
            // }
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
            _id: "$Miner", // todo: b.Miner可能不是ID地址
            minedCount: {$sum: 1},
        }
    },
]