// ExecTrace
// todo: store sectorsize for all miners
// 每T?
[
    {
        $match: {
            $and: [
                {Depth: 1},
                {"Msg.Method": {$in: [/*5,*/ 6, 7, 25, 26, 28]}},
                {Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [
                        // {$eq: ["$Detail.Method", "SubmitWindowedPoSt"]},
                        {$eq: ["$Msg.MethodName", "PreCommitSector"]},
                        {$eq: ["$Msg.MethodName", "ProveCommitSector"]},
                        {$eq: ["$Msg.MethodName", "PreCommitSectorBatch"]},
                        {$eq: ["$Msg.MethodName", "ProveCommitAggregate"]},
                        {$eq: ["$Msg.MethodName", "PreCommitSectorBatch2"]},
                    ]
                }
            ],

            // "MsgRct.ExitCode": 0, //todo
        },
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
                                {
                                    $eq: ["$_id", "$$mcid"],
                                },
                            ],
                        },
                    },
                },
            ],
            as: "message"
        }
    },
    {
        $unwind: "$message"
    },
    // {
    //     $lookup: {
    //         from: "MinerFunds",
    //         let: {
    //             miner: "$Msg.To",
    //         },
    //         pipeline: [
    //             {
    //                 $match: {
    //                     $expr: {
    //                         $and: [
    //                             {$eq: ["$Addr", "$$miner"]},
    //                             {$eq: ["$Info.SectorSize", ctx.SectorSize]},
    //                             {$gte: ["$Epoch", ctx.StartEpoch]},
    //                             {$lte: ["$Epoch", ctx.EndEpoch]}, // todo: too slow
    //                         ],
    //                     },
    //                 }
    //             },
    //             {$limit: 1},
    //         ],
    //         as: "minerFunds"
    //     }
    // },
    // {
    //     $unwind: "$minerFunds"
    // },
    {
        $group: {
            _id: "$Msg.To",
            GasCost: {$sum: {$toDecimal: "$GasCost.TotalCost"}}
        }
    }
]
