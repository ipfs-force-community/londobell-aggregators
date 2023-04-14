// ExecTrace
// f2 actor: created by "01" with "Exec";
// miner actor: created by "04" with "CreateMiner"
// evm actor: created by "010" with "CreateExternal"
// todo: miner actor也会通过"Exec"来创建吗？
[
    {
        $match: {
            "Msg.To": ctx.To,
            "Msg.Method": ctx.Method,
            "Detail.Return.RobustAddress": ctx.Addr
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        }
    },
    {
        $unwind: "$message",
    },
    {
        $project: {
            _id: 0,
            Cid: {
                $cond: {
                    if:{
                        $eq:["$message.SignedCid", null]
                    }, then: "$message._id",
                    else: "$message.SignedCid"
                }
            },
            Epoch: "$Epoch",
            From: "$message.From",
            To: "$message.To",
            Value: "$message.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$message.Detail.Method",
        }
    }
]
