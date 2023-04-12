// ExecTrace
// todo: evmactor CreateExternal(just for display, not belong to actor)
// todo: ctx.Addr 使用robust & ID
[
    {
        $match: {
            $expr: {
                $and: [
                    {$or: [
                        {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1]}]},
                    ]},
                    {$or:[
                        {$eq: ["$Msg.From", ctx.Addr]},
                        {$eq: ["$Msg.To", ctx.Addr]}
                        ]
                    },
                    {$eq: ["$Depth", 1]},
                    {$lte: ["$Epoch", ctx.StartEpoch]},
                    {$gt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
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
        $unwind: "$message"
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