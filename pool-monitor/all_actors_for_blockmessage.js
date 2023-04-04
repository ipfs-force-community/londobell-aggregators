// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$eq: ["$Depth", 1]},
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
        $project: {
            _id: 0,
            From: "$Msg.From",
            To: "$Msg.To"
        }
    },
    {
        $group: {
            _id: 0,
            all_froms: {$push: "$From"},
            all_tos: {$push: "$To"},
        }
    }, // todo: 同一actor 地址转换
]

