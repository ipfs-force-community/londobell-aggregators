// ActorMessage
[
    {
        $match: {
            ActorID: ctx.Addr,
            IsBlock: false,
            Epoch: {$gte: ctx.StartEpoch, $end: ctx.EndEpoch}
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                ids: {$split: ["$_id", "-"]},
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", {$concat: [{$arrayElemAt: ["$$ids", 0]}, "-", {$arrayElemAt: ["$$ids", 1]}]}]},
                            ],
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
            "Epoch": ctx.Sort,
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
            IsBlock     :"$trace.IsBlock",
            SubCallCount :"$trace.SubCallCount",
            Depth        :"$trace.Depth",
        }
    }

]