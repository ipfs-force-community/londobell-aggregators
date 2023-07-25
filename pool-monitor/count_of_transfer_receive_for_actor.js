// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "ExitCode": 0,
            "Type": "to",
            "Value": {$gt: "0"},
            "MethodName": {$ne: "ApplyRewards"},
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