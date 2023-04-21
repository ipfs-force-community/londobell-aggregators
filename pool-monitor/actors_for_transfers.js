// ExecTrace
// todo: 自己（f3）给自己(f0)发一笔 钱/消息
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$MsgRct.ExitCode", 0]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $project: {
            _id: 1,
            Cid: 1,
            "Msg.From": 1,
            "Msg.To": 1
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {cid: "$Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$_id", "$$cid"]},
                                    {$gt: [{$toDecimal: "$Value"}, 0]}
                                ]
                            }
                        }
                },
                {
                    $project: {
                        _id: 1
                    }
                }
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $group: {
            _id: "$_id",
            Froms: {$push: "$Msg.From"},
            Tos: {$push: "$Msg.To"}, // todo: 避免自己->自己的消息存两遍 不会，map只存一次
        }
    },
]