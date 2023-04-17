// ExecTrace
// todo: evmActor created at CreateExternal
[
    {
        $match: {
            $expr: {
                $or:[
                    {$eq: ["$Msg.From", ctx.Addr]},
                    {$eq: ["$Msg.To", ctx.Addr]}
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