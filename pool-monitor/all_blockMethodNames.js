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
            _id: 0,
            _MethodNames: {$addToSet: "$Msg.MethodName"},
        }
    }
]