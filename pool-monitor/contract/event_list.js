// ActorEvent
[
    {
        $match: {
            ActorID: ctx.Addr,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort,
            "LogIndex": -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project:{
            ActorID: "$ActorID",
            Epoch: "$Epoch",
            Cid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$Cid",
                    else: "$SignedCid"
                }
            },
            Topics: "$Topics",
            Data: "$Data",
            LogIndex: "$LogIndex",
            Removed: "$Removed"
        }
    }
]