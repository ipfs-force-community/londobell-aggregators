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
                                    {$eq: ["$Detail.PackedHeight", ctx.StartEpoch]}
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
            methods: {$addToSet: "$message.Detail.method"},
            totalCount: {$sum: 1}
        }
    },
]