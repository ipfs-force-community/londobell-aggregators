// BlockMessage
[
    {
        $match: {
            _id: ctx.Cid
        }
    },
    {
        $lookup: {
            from: "ActorMessage",
            let: {cids: "$Messages", epoch: "$Epoch"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$IsBlock", true]},
                                    {$eq:["$Type", "from"]},
                                    {$eq: ["$Epoch", "$$epoch"]},
                                    {$eq: ["$MethodName", ctx.MethodName]},
                                    {$or: [
                                            {$in: ["$Cid", "$$cids"]},
                                            {$in: ["$SignedCid", "$$cids"]}
                                        ]},
                                ]
                            }
                        }
                }
            ],
            as: "trace"
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $group: {
            _id: "$Epoch",
            totalCount: {$sum: 1}
        }
    }
]
