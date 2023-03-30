// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$MsgRct.ExitCode", 0]}, //
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
                                    {$gt: [{$toDecimal: "$Value"}, 1e19]} // todo: 2e22
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
            count: {$sum: 1}
        }
    }
]