// ActorMessage
// 用浏览器看老是丢失之前筛选的路径
// todo: value==0 找account第一条Send
[
    {
        $match: {
            IsBlock: true,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            Type: "from",
            MethodName: ctx.MethodName
        }
    },
    {
        $sort: {
            Epoch: ctx.Sort
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            Cid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$_id",
                    else: "$SignedCid"
                }
            },
            Epoch: "$Epoch",
            From: "$From",
            To: "$To",
            Value: "$Value",
            ExitCode: "$ExitCode"
        }
    }
]