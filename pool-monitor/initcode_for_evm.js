[
    {
        $match:{
            "IsBlock":true,
            "Msg.MethodName":"CreateExternal",
            "Detail.Return.ActorID":ctx.Addr,
            "MsgRct.ExitCode": 0,
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
        $unwind: "$message",
    },
    {
        $project:{
            "InitCode":"$message.Params"
        }
    }
]