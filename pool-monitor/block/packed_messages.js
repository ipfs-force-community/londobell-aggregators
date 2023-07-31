// BlockMessage
[
    {
        $match: {
            "_id": ctx.Cid
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                cids: "$Messages",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$IsBlock", true]},
                                {$eq:["$Epoch", "$$epoch"]},
                                {$or: [
                                        {$in: ["$Cid", "$$cids"]},
                                        {$in: ["$SignedCid", "$$cids"]}
                                    ]
                                },
                            ]
                        },
                    },
                },
            ],
            as: "trace"
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $sort: {
            "_id": ctx.Sort,
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$trace.Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$_id"]},
                            ],
                        },
                    },
                },
            ],
            as: "message",
        },
    },
    {
        $unwind: "$message",
    },
    {
        $project: {
            Epoch: "$Epoch",
            Cid:
                {$cond: {
                        if:{
                            $eq:["$SignedCid", null]
                        }, then: "$Cid",
                        else: "$SignedCid"
                    }
                },
            From: "$From",
            To: "$To",
            Nonce: "$message.Nonce",
            Version: "$message.Version",
            GasLimit: "$message.GasLimit",
            GasFeeCap : "$message.GasFeeCap",
            GasPremium : "$message.GasPremium",
            Value: "$Value",
            ExitCode: "$ExitCode",
            MethodName: "$MethodName",
            Method: "$trace.Msg.Method",
            GasCost: "$GasCost",
            Params: "$message.Params",
            Return: "$trace.MsgRct.Return",
        }
    }
]