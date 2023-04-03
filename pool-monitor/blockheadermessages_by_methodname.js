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
            // totalCount: {$sum: 1},
            messages: {$addToSet: "$_id"}
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {cids: "$messages"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$or: [
                                            {$in: ["$Cid", "$$cids"]},
                                            {$in: ["$SignedCid", "$$cids"]}
                                        ]},
                                    {$eq:["$Epoch",ctx.StartEpoch]},
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
        $addFields: {
            Cid: {
                $cond: {
                    if: {
                        $eq: ["$trace.SignedCid", null]
                    }, then: "$trace.Cid",
                    else: "$trace.SignedCid"
                }
            },
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {cid: "$Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$or: [
                                            {$eq: ["$_id", "$$cid"]},
                                            {$eq: ["$SignedCid", "$$cid"]}
                                        ]},
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
        $sort: {
            Cid: 1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            Cid: "$Cid",
            Epoch: "$Epoch",
            Value: "$message.Value",
            From: "$message.From",
            To: "$message.To",
            ExitCode: "$trace.MsgRct.ExitCode",
            Method: "$message.Detail.Method",
            Params: "$message.Params", // []byte
            Return: "$trace.MsgRct.Return",
            ParamsDetail: "$message.Detail.Params",
            ReturnDetail: "$trace.Detail.Return",
            Version: "$message.Version",
            Nonce: "$message.Nonce",
            GasLimit: "$message.GasLimit",
            GasFeeCap: "$message.GasFeeCap",
            GasPremium: "$message.GasPremium",
            GasCost: "$trace.GasCost",
        }
    }
]
