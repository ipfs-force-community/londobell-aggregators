// ActorMessage
[
    {
        $match: {
            "IsBlock": true,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: {ActorID: "$ActorID", MethodName: "$MethodName"},
            Count: {$sum: 1}
        }
    }
]