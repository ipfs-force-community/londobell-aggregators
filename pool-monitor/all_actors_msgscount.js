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
            _id: "$ActorID",
            Count: {$sum: 1}
        }
    }
]