// Message
// todo: 还包括一条创建消息
[
    {
        $match: {
            $expr:
                {$and: [
                        {$eq: ["$Detail.PackedHeight", ctx.StartEpoch]},
                        // {$lt: ["$Detail.PackedHeight", ctx.EndEpoch]},
                        {$or: [
                                {$eq: ["1", {$substrBytes: ["$From", 0, 1] }]},
                                {$eq: ["3", {$substrBytes: ["$From", 0, 1] }]},
                                {$eq: ["4", {$substrBytes: ["$From", 0, 1] }]}
                            ]
                        },
                        {$or:[
                                {$eq: ["$To", ctx.Addr]},
                                {$eq: ["$From", ctx.Addr]}
                            ]}
                    ]}
        }
    },
    {
        $group: {
            _id: 0,
            all_methods: {$addToSet: "$Detail.Method"}
        }
    }
]
