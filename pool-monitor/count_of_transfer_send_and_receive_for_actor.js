// ActorMessage
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "ExitCode": 0,
            "TransferType": {$in: ["Receive", "Send"]},
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
