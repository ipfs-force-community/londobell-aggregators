// ExecTrace
// todo: 内部调用方法value较大（比如引入智能合约后）？
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Msg.Method", 0]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {
                mcid: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$mcid"]},
                                {$gte: [{$toDecimal: "$Value"}, 2e22]},
                            ],
                        },
                    },
                },
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            _id: 0,
            signed_cid: {
                $cond: {
                    if:{
                        $eq:["$message.SignedCid", null]
                    }, then: "$message._id",
                    else: "$message.SignedCid"
                }
            },
            epoch: "$Epoch",
            from: "$message.From",
            to: "$message.To",
            value: "$message.Value",
            method: "$message.Detail.Method"
        }
    }
]