// ExecTrace
[
    {
        $match: {
            "IsBlock": true,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $group: {
            _id: "$Msg.MethodName",
            Count:{$sum:1}
        }
    }
]