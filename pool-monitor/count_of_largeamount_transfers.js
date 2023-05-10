// ExecTrace
[
    {
        $match: {
            "MsgRct.ExitCode": 0,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},

            // $expr: {
            //     $and: [
            //         {$eq: ["$MsgRct.ExitCode", 0]}, //
            //         {$gte: ["$Epoch", ctx.StartEpoch]},
            //         {$lt: ["$Epoch", ctx.EndEpoch]}
            //     ]
            // }
        }
    },
    {
        $project: {
            _id: 0,
            Cid: 1
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
                                    {$gt: [{$toDecimal: "$Value"}, 1e22]} // todo: 2e22
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
            _id: 0,
            count: {$sum: 1}
        }
    }
]
