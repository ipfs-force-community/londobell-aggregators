// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "ExitCode": 0,
            "Value": {$gt: "0"},
            "MethodName": {$ne: "ApplyRewards"},
            "To": {$ne: "099"},
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1}
        }
    }
]
