// ExecTrace
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
            _id: 0,
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
        $project: {
           From: "$Msg.From",
            To: "$Msg.To",
        }
    }
]