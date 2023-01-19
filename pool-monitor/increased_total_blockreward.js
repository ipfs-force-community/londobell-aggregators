// ActorState
// todo: 全网分段计算
[
    {
        $match: {
            "Epoch": {$in: [ctx.StartEpoch, ctx.EndEpoch]},
            "Addr": "02"
        }
    },
    {
        $group: {
            _id:0,
            from: {
                $first: "$$ROOT",
            },
            to: {
                $last: "$$ROOT",
            }
        }
    },
    {
        $addFields: {
            increasedBlockReward:{$subtract: [{$toDecimal: "$to.Detail.TotalStoragePowerReward"}, {$toDecimal: "$from.Detail.TotalStoragePowerReward"}]}}
    }
]
