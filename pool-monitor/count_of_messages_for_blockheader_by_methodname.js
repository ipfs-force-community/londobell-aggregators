// BlockMessage
[
    {
        $match: {
            _id: ctx.Cid
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {cids: "$Messages", epoch: "$Epoch"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$IsBlock", true]},
                                    {$eq: ["$Epoch", "$$epoch"]},
                                    {$eq: ["$Msg.MethodName", ctx.MethodName]},
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
