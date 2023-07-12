// ActorEvent
[
    {
        $match: {
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "Epoch": -1,
            "LogIndex": -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]