// BlockMessage
[
    {
        $match: {
            _id: ctx.Cid
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {cids: "$Messages"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$or: [
                                            {$in: ["$_id", "$$cids"]},
                                            {$in: ["$SignedCid", "$$cids"]}
                                        ]},
                                    // {$eq: ["$Detail.PackedHeight", ctx.StartEpoch]},
                                    {$eq: ["$Detail.Method", ctx.MethodName]},
                                ]
                            }
                        }
                }
            ],
            as: "message"
        }
    },
    {
        $unwind: "$message"
    },
    {
        $group: {
            _id: 0,
            totalCount: {$sum: 1}
        }
    },
]
