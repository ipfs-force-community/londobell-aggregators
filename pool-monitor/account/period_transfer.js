// ActorMessage
[
    {
        $match: {
            ActorID: ctx.Addr,
            Type: ctx.TransferType, // "from" or "to"
            ExitCode: 0,
            Value: {$gt: "0"},
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $group: {
            _id: 0,
            TotalValue: {$sum: {$toDecimal: "$Value"}}
        }
    }
]