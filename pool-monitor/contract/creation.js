// ExecTrace
[
    {
        $match: {
            IsBlock: false,
            "MsgRct.ExitCode": 0,
            "Msg.MethodName": "Constructor",
            "Msg.From": "01",
            "Msg.To": ctx.Addr,
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
            Creator: "$Detail.Params.Creator",
        }
    }
]