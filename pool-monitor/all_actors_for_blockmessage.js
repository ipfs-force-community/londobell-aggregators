// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $group: {
            _id: 0,
            all_froms: {$addToSet: "$Msg.From"},
            all_tos: {$addToSet: "$Msg.To"},
        }
    }, // todo: 同一actor 地址转换
]

