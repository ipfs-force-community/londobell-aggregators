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


// ExecTrace
// todo: 合约子调用相同的消息只保留一条，会有问题  2s
// 建好索引再测  7d14s
[
    {
        $match: {
            "MsgRct.ExitCode": 0,
            "Epoch": { $gte: ctx.StartEpoch, $lt: ctx.EndEpoch },
            "FIL": { $gte: 10000 } // todo 与之前逻辑一致,后续可以作为参数传入
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $addFields: {
          target_id: {
            $cond: {
              if: { $eq: ["$Depth", 1] },
              then: null, // 当 Depth 为 1 时，将 target_id 设置为 null，跳过查询步骤
              else: {
                $concat: [
                  { $arrayElemAt: [{ $split: ["$_id", "-"] }, 0] },
                  "-",
                  { $arrayElemAt: [{ $split: ["$_id", "-"] }, 1] }
                ]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "ExecTrace",
          localField: "target_id",
          foreignField: "_id",
          as: "targetData"
        }
      },
      {
        $addFields: {
          Cid: {
            $cond: {
              if: { $eq: ["$Depth", 1] },
              then: "$Cid",
              else: { $arrayElemAt: ["$targetData.Cid", 0] }
            }
          },
          SignedCid: {
            $cond: {
              if: { $eq: ["$Depth", 1] },
              then: "$SignedCid",
              else: { $arrayElemAt: ["$targetData.SignedCid", 0] }
            }
          }
        }
      },   
    {
        $project: {
            _id: 0,            
            Cid: {
                $cond: {
                    if: {
                        $eq: ["$SignedCid", null]
                    }, then: "$Cid",
                    else: "$SignedCid"
                }
            },
            Epoch: "$Epoch",
            From: "$Msg.From",
            To: "$Msg.To",
            Value: "$Msg.Value",
            Method: "$Msg.MethodName",
            Depth: "$Depth"
        }
    }
]