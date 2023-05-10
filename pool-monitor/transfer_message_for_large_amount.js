// // ExecTrace
// // todo: 只包含显式Send方法？ 内部调用方法value较大（比如引入智能合约后）？
// // todo: trace表添加Value值，缩小sort范围   1m18s
// [
//     {
//         $match: {
//             "MsgRct.ExitCode": 0,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
//         }
//     },
//     // {
//     //     $project: {
//     //         "_id": 0,
//     //         "Epoch": 1,
//     //         "SignedCid": 1,
//     //         "Cid": 1,
//     //         "Msg.From": 1,
//     //         "Msg.To": 1
//     //     }
//     // },
//     {
//         $sort: {
//             Epoch : -1
//         }
//     },
//     {
//         $lookup: {
//             from: "Message",
//             let: {
//                 mcid: "$Cid",
//             },
//             pipeline: [
//                 {
//                     $match: {
//                         $expr: {
//                             $and: [
//                                 {$eq: ["$_id", "$$mcid"]},
//                                 // {$gte: [{$toDecimal: "$Value"}, 1e22]}, // todo: 2e22
//                                 { $regexMatch: { input: "$Value", regex: "^.{23,}$" } }
//                             ],
//                         },
//                     },
//                 },
//                 // {
//                 //     $project: {
//                 //         _id: 0,
//                 //         "Detail.Method": 1,
//                 //         "Value": 1
//                 //     }
//                 // },
//             ],
//             as: "message",
//         }
//     },
//     {
//         $unwind: "$message"
//     },
//     // {
//     //     $match: {
//     //         "message.Value": {$regex: "^.{23,}$"}
//     //     }
//     // },
//
//     // {
//     //     $lookup: {
//     //         from: "ExecTrace",
//     //         let: {
//     //             ids: {$split: ["$_id", "-"]},
//     //             epoch: "$Epoch"
//     //         },
//     //         pipeline: [
//     //             {
//     //                 $match: {
//     //                     $expr: {
//     //                         $and: [
//     //                             {$eq: ["$Depth", 1]},
//     //                             {$eq: ["$Epoch", "$$epoch"]},
//     //                             {$eq: ["$_id", {$concat: [{$arrayElemAt: ["$$ids", 0]}, "-", {$arrayElemAt: ["$$ids", 1]}]}]},
//     //                             {$or: [
//     //                                     {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
//     //                                     {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
//     //                                     {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
//     //                                 ]
//     //                             },
//     //                         ],
//     //                     },
//     //                 },
//     //             },
//     //         ],
//     //         as: "parentTrace",
//     //     }
//     // },
//     // {
//     //     $unwind: "$parentTrace"
//     // },
//     // {
//     //     $lookup: {
//     //         from: "Message",
//     //         let: {cid: "$parentTrace.Cid"},
//     //         pipeline: [
//     //             {
//     //                 $match:
//     //                     {
//     //                         $expr: {
//     //                             $and: [
//     //                                 {$eq: ["$_id", "$$cid"]}
//     //                             ]
//     //                         }
//     //                     }
//     //             }
//     //         ],
//     //         as: "parentMessage",
//     //     }
//     // },
//     // {
//     //     $unwind: "$parentMessage",
//     // },
//
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     },
//     {
//         $project: {
//             _id: 0,
//             Cid: {
//                 $cond: {
//                     if:{
//                         $eq:["$SignedCid", null]
//                     }, then: "$Cid",
//                     else: "$SignedCid"
//                 }
//             },
//             Epoch: "$Epoch",
//             From: "$Msg.From",
//             To: "$Msg.To",
//             Value: "$message.Value",
//             Method: "$message.Detail.Method"
//         }
//     }
// ]


// Message
// todo: 合约子调用相同的消息只保留一条，会有问题  2s
[
    {
        $match: {
            "Detail.PackedHeight": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Value": {$regex: "^.{23,}$"} // 10000Fil
        }
    },
    {
        $sort: {
            "Detail.PackedHeight" : -1
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {id: "$_id"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$Cid", "$$id"]},
                                    {$eq: ["$MsgRct.ExitCode", 0]}
                                ]
                            }
                        }
                }
            ],
            as: "trace",
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            _id: 0,
            Cid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$_id",
                    else: "$SignedCid"
                }
            },
            Epoch: "$Detail.PackedHeight",
            From: "$From",
            To: "$To",
            Value: "$Value",
            Method: "$Detail.Method"
        }
    }
]