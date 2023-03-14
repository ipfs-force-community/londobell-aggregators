// Message
[
    {
        $match: {
            $expr:
                {$and: [
                        {$gt: ["$Nonce", 0]},
                    {$gte: ["$Detail.PackedHeight", ctx.StartEpoch]},
                    {$lt: ["$Detail.PackedHeight", ctx.EndEpoch]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$From", 0, 1] }]}
                        ]
                    }
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

    // todo: epoch range还是全表扫描？
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
                    }
                ]
            }
        }
    },
    {
        $lookup:
            {
                from: "Message",
                let: {cid: "$Cid"},
                pipeline: [
                    {
                        $match:
                            {
                                $expr: {
                                    $and: [{$eq: [ "$_id", "$$cid"]}]
                                }
                            }
                    }
                ],
                as: "blockmessage"
            }
    },
    {
        $unwind: "$blockmessage"
    },
    {
        $group: {
            _id: 0,
            all_methods: {$addToSet: "$Detail.Method"}
        }
    }
]

