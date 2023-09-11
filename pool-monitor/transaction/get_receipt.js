// ExecTrace
// deprecated
[
    {
        $match: {
            $and: [
                {$or: [{"Cid": ctx.Cid}, {"SignedCid": ctx.Cid}]},
            ]
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        },
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            Epoch: "$Epoch",
            Cid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$_id",
                    else: "$SignedCid"
                }
            },
            From: "$Msg.From",
            To: "$Msg.To",
            Nonce: "$message.Nonce",
            Version: "$message.Version",
            Value: "$Msg.Value",
            MethodName: "$Msg.MethodName",
            Method: "$Msg.Method",
            GasLimit: "$message.GasLimit",
            GasFeeCap: "$message.GasFeeCap",
            GasPremium: "$message.GasPremium",
            Params: "$message.Params",
            Return: "$MsgRct.Return",
            ExitCode: "$MsgRct.ExitCode",
            EventsRoot: "$MsgRct.EventsRoot",
            GasCost: "$GasCost",
            IsBlock: "$IsBlock",
            SubCallCount: "$SubCallCount",
            Depth: "$Depth"
        }
    }
]