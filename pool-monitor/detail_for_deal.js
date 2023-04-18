// DealProposal
// todo: 有些订单的PublishStorageDeals消息太早，未存在现数据库
// todo: 暂时隐藏创建订单消息
[
    {
        $match: {
            _id: ctx.ID,
        },
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
