// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "IsBlock": true,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: "$MethodName",
            Count: {$sum: 1}
        }
    }
]