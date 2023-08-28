// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "ExitCode": 0,
            "TransferType": "Send",
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit:ctx.Limit
    },
    {
        $project: {
            _id: 0,
            Cid: {
                $cond: {
                    if: {
                        $eq: ["$SignedCid", null]
                    }, then: "$Cid",
                    else: "$SignedCid"
                }
            },
            Epoch: "$Epoch",
            From: "$From",
            To: "$To",
            Value: "$Value",
            Method: "$MethodName",
            Depth: {
                $cond: {
                    if:{
                        $eq:["$IsBlock", true]
                    }, then: 1,
                    else: 2
                }
            },
            IsBlock: "$IsBlock"
        }
    }
]