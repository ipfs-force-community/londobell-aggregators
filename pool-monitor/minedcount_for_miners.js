// 出块miners
// BlockHeader
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                ]
            }
        }
    },
    {
        $group: {
            _id: "$Miner", // todo: b.Miner可能不是ID地址
            minedCount: {$sum: 1},
        }
    },
]