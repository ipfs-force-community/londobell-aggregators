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
            all_froms: {$addToSet: "$From"},
            all_tos: {$addToSet: "$To"},
        }
    }
]