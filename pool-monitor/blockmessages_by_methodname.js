// ExecTrace
// todo: skip或limit变大 变慢
[
    {
        $match: {
            "IsBlock": true,
            "Msg.MethodName": ctx.MethodName,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            Epoch: -1
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
            _id: 0,
            SignedCid:
                {$cond: {
                        if:{
                            $eq:["$SignedCid", null]
                        }, then: "$Cid",
                        else: "$SignedCid"
                    }
                },
            Epoch: "$Epoch",
            From: "$Msg.From",
            To: "$Msg.To",
            Value: "$Msg.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$Msg.MethodName"
        }
    }
]
