// MessageBlock
[
    {
        $match: {
            Blocks: {$in: [ctx.Cid]},
            Epoch: ctx.StartEpoch
        }
    },
    {
        $group: {
            _id: 0,
            messages: {$addToSet: "$_id"}
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {cids: "$messages"},
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
                                    {$eq: ["$Detail.PackedHeight", ctx.StartEpoch]},
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
