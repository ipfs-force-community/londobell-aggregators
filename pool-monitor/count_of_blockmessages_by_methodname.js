// ExplicitMessage 90个高度2秒
// db.ExecTrace.createIndex({"Epoch":1,"Depth":1,"Msg.From":1}, {"sparse": true});

[
    {
        $match: {
            "MethodName": ctx.MethodName,
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
