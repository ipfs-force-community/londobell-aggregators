// ActorMessage
// todo: evmActor created at CreateExternal
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "IsBlock": true,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort  // 1: createTime for f1、f3 account; -1: latestTime
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            Epoch: "$Epoch"
        }
    }
]