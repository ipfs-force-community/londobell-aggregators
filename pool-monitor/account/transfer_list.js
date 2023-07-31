// ActorMessage
// todo: add FromID & ToID
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$ActorID", ctx.Addr]},
                    {$eq:["$Type", ctx.TransferType]}, // send or receive or all
                    {$eq: ["$ExitCode", 0]},
                    {$gt: [{$toDecimal: "$Value"}, ctx.Value]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$in: ["$From", ctx.Addrs]}, // 用户没填则填addr进去
                    {$in: ["$To", ctx.Addrs]},
                ]
            }
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort,
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
            Epoch: "$Epoch",
            Cid:
                {$cond: {
                        if:{
                            $eq:["$SignedCid", null]
                        }, then: "$Cid",
                        else: "$SignedCid"
                    }
                },
            From: "$From",
            To: "$To",
            Value: "$Value",
            MethodName: "$MethodName",
            IsBlock: "$IsBlock"
        }
    }
]