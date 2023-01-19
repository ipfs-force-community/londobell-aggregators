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
                    {$eq: ["Msg.Method", 0]},
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
    },
    {
        $addFields: {
            behavior: {
                $cond: {
                    if: {
                        $eq: ["Msg.From", ctx.Addr],
                    },
                    then: 0,
                    else:1,
                },
            } // 0: send; 1: receive
        }
    }
]