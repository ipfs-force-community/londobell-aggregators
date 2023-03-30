// Message
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Detail.PackedHeight", ctx.StartEpoch]},
                    {$lt: ["$Detail.PackedHeight", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $group: {
            _id: "$Detail.Method",
            count: {$sum: 1}
        }
    }
]