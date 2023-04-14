// ExecTrace
// todo: evmActor created at CreateExternal
[
    {
        $match: {
            $expr: {
                $and: [
                        {$gte: ["$Epoch", ctx.StartEpoch]},
                        {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$or:[
                        {$in: ["$Msg.From", ctx.Addrs]},
                        {$in: ["$Msg.To", ctx.Addrs]}
                    ]}
                ]
            }
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