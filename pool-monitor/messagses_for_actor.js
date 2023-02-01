// ExecTrace
// todo: evmactor CreateExternal(just for display, not belong to actor)
[
    {
        $match: {
            $expr: {
                $and: [
                    {$or: [ // todo: 4
                        {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1]}]},
                    ]},
                    {$or:[
                        {$eq: ["Msg.From", ctx.Addr]},
                        {$eq: ["Msg.To", ctx.Addr]}
                        ]
                    },
                    {$eq: ["Depth", 1]},
                    {$gte: ["Epoch", ctx.StartEpoch]},
                    {$lt: ["Epoch", ctx.EndEpoch]}
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
    }
]