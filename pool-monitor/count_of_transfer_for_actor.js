// ExecTrace
[
    {
        $match: {
            $and: [
                {"MsgRct.ExitCode": 0},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From": ctx.Addr}, {"Msg.To": ctx.Addr}]}
            ]

            // $expr: {
            //     $and: [
            //         {$or:[
            //                 {$eq: ["$Msg.From", ctx.Addr]},
            //                 {$eq: ["$Msg.To", ctx.Addr]}
            //             ]
            //         },
            //         {$eq: ["$MsgRct.ExitCode", 0]},
            //         {$gte: ["$Epoch", ctx.StartEpoch]},
            //         {$lt: ["$Epoch", ctx.EndEpoch]}
            //     ]
            // }
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
            count: {$sum: 1} // todo: count还需测试
        }
    }
]