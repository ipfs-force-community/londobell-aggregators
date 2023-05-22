// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "IsBlock": true,
            "MethodName": ctx.MethodName,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1}
        }
    }
]
