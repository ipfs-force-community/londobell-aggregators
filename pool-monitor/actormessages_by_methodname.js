// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "IsBlock": true,
            "MethodName": ctx.MethodName,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            Epoch: -1
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
            _id: 0,
            SignedCid:
                {$cond: {
                        if:{
                            $eq:["$SignedCid", null]
                        }, then: "$Cid",
                        else: "$SignedCid"
                    }
                },
            Epoch: "$Epoch",
            From: "$From",
            To: "$To",
            Value: "$Value",
            ExitCode: "$ExitCode",
            Method: "$MethodName"
        }
    }
]
