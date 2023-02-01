// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Msg.Method", 0]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {
                mcid: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$mcid"]},
                                {$gte: [{$toInt: "$Value"}, 2*10e22]},
                            ],
                        },
                    },
                },
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    }
]