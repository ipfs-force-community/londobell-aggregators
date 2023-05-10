// ExecTrace
// todo: evmActor created at CreateExternal
[
    {
        $match: {
            $and: [
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From": {$in: ctx.Addrs}}, {"Msg.To": {$in: ctx.Addrs}}]}
            ]

            // $expr: {
            //     $and: [
            //             {$gte: ["$Epoch", ctx.StartEpoch]},
            //             {$lt: ["$Epoch", ctx.EndEpoch]},
            //         {$or:[
            //             {$in: ["$Msg.From", ctx.Addrs]},
            //             {$in: ["$Msg.To", ctx.Addrs]}
            //         ]}
            //     ]
            // }
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