// DealProposal
// todo: 有些订单的PublishStorageDeals消息太早，未存在现数据库
// todo: 暂时隐藏创建订单消息
[
    {
        $match: {
            _id: ctx.ID,
        },
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                id: "$_id",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Depth", 1]},
                                {$eq: ["$MsgRct.ExitCode", 0]},
                                {$eq: ["$Msg.To", "05"]},
                                {$eq: ["$Msg.Method", 4]},
                                {$in: ["$$id", "$Detail.Return.IDs"]}
                            ],
                        },
                    },
                },
            ],
            as: "trace",
        }
    },
    {
        $unwind: "$trace"
    },
    // {
    //     $lookup: {
    //         from: "ExecTrace",
    //         let: {
    //             id: "$_id",
    //         },
    //         pipeline: [
    //             {
    //                 $match: {
    //                     $expr: {
    //                         $and: [
    //                             {$eq: ["$Depth", 1]},
    //                             {$eq: ["$MsgRct.ExitCode", 0]},
    //                             {$eq: ["$Msg.To", "05"]},
    //                             {$eq: ["$Msg.Method", 4]},
    //                             {$in: ["$$id", "$Detail.Return.IDs"]}
    //                         ],
    //                     },
    //                 },
    //             },
    //         ],
    //         as: "trace",
    //     }
    // },
    // {
    //     $unwind: "$trace"
    // },
    {
        $project: {
            DealID: "$_id",
            Epoch: "$trace.Epoch",
            Cid: "$trace.Cid",
            // Epoch: "$trace.Epoch",
            // Cid: "$trace.Cid",
            PieceCID: "$PieceCID",
            VerifiedDeal: "$VerifiedDeal",
            Client: "$Client",
            Provider: "$Provider",
            ProviderCollateral: "$ProviderCollateral",
            ClientCollateral: "$ClientCollateral",
            StartEpoch: "$StartEpoch",
            EndEpoch: "$EndEpoch",
            PieceSize: "$PieceSize",
            StoragePricePerEpoch: "$StoragePricePerEpoch"
        }
    }
]

// // ExecTrace
// [
//     {
//         $match: {
//             "Depth":1,
//             "MsgRct.ExitCode":0,
//             "Msg.To": "05",
//             "Msg.Method": 4,
//             "Detail.Return.IDs":{$in:[ctx.ID]},
//             "Epoch": {$gte: {$subtract:[ctx.StartEpoch, 10*2880]}, $lt: ctx.StartEpoch}
//         }
//     },
//     {
//         $lookup:  {
//             from: "DealProposal",
//             let: {cid: ctx.ID},
//             pipeline: [
//                 {
//                     $match:
//                         {
//                             $expr: {
//                                 $and: [
//                                     {$eq: [ "$_id", "$$cid"]},
//                                 ]
//                             }
//                         }
//                 }
//             ],
//             as: "deal"
//         }
//     },
//     {
//         $unwind: "$deal"
//     },
//     {
//         $project: {
//             DealID: "$deal._id",
//             Epoch: "$Epoch",
//             Cid: "$Cid",
//             PieceCID: "$deal.PieceCID",
//             VerifiedDeal: "$deal.VerifiedDeal",
//             Client: "$deal.Client",
//             Provider: "$deal.Provider",
//             ProviderCollateral: "$deal.ProviderCollateral",
//             ClientCollateral: "$deal.ClientCollateral",
//             StartEpoch: "$deal.StartEpoch",
//             EndEpoch: "$deal.EndEpoch",
//             PieceSize: "$deal.PieceSize",
//             StoragePricePerEpoch: "$deal.StoragePricePerEpoch"
//         }
//     }
// ]
