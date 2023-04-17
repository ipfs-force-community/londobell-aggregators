// ActorState
[
    {
        $match: {
            "Epoch": {$in: [ctx.StartEpoch, ctx.EndEpoch]},
            "Addr": "04"
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
            increasedAdjustedPower:{$subtract: [{$toDecimal: "$to.Detail.TotalQualityAdjPower"}, {$toDecimal: "$from.Detail.TotalQualityAdjPower"}]}}
    }
]