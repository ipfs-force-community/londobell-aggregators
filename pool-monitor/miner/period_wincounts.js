// ActorMessage
[
    {
        $match: {
            "ActorID": "00",
            IsBlock: false,
            "To": "02",
            "MethodName": "AwardBlockReward",
            "Type": "from",
            "ExitCode": 0,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        },
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$Cid"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$_id"]},
                                {$eq: ["$Detail.Params.Miner", ctx.Addr]}, //todo: 有无长地址情况？
                            ],
                        },
                    },
                },
            ],
            as: "wincountMatches",
        },
    },
    {
        $unwind: "$wincountMatches",
    },
    {
        $group: {
            _id: 0,
            WinCounts: {$sum: "$wincountMatches.Detail.Params.WinCount"},
            GasRewards: {$sum: {$toDecimal: "$wincountMatches.Detail.Params.GasReward"}}
        }
    },

    //// 列举历史
    // {
    //     $sort: {
    //         "Epoch": -1,
    //     }
    // },
    // {
    //     $skip: ctx.Skip
    // },
    // {
    //     $limit: ctx.Limit
    // },
    // {
    //     $lookup: {
    //         from: "BlockHeader",
    //         let: {
    //             miner: "$wincountMatches.Detail.Params.Miner",
    //             epoch: "$Epoch"
    //         },
    //         pipeline: [
    //             {
    //                 $match: {
    //                     $expr: {
    //                         $and: [
    //                             {$eq: ["$$epoch", "$Epoch"]},
    //                             {$eq: ["$$miner", "$Miner"]}, // 有无长地址情况？
    //                         ],
    //                     },
    //                 },
    //             },
    //         ],
    //         as: "blockheader",
    //     },
    // },
    // {
    //     $unwind: "$blockheader",
    // },
    // {
    //     $project: {
    //         Miner: "$wincountMatches.Detail.Params.Miner",
    //         Epoch: "$Epoch",
    //         Block: "$blockheader._id",
    //         MessageCount: "$blockheader.MessageCount",
    //         Wincount: "$wincountMatches.Detail.Params.WinCount",
    //         GasReward: {$toDecimal: "$wincountMatches.Detail.Params.GasReward"}
    //     }
    // }
]
