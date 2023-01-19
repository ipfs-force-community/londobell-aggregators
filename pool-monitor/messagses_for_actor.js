// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
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