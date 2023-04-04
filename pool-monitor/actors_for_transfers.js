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
            _id: 0,
            all_froms: {$push: "$Msg.From"},
            all_tos: {$push: "$Msg.To"}, // todo: 避免自己->自己的消息存两遍 不会，map只存一次
        }
    },
]