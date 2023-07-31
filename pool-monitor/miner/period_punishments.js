// ActorMessage
[
    {
        $match: {
            ActorID: ctx.Addr,
            ExitCode: 0,
            To: "099",
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: 0,
            Punishments: {$sum: {$toDecimal: "$Value"}}
        }
    }
]