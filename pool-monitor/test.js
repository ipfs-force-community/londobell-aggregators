// //messages_for_actor
// //totalcount
// // ms ActorID_1_IsBlock_1_Epoch_1
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "IsBlock": true,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
//         }
//     },
//     {
//         $group: {
//             _id: 0,
//             Count: {$sum: 1}
//         }
//     }
// ]
//
// //page
// // ms ActorID_1_IsBlock_1_Epoch_1
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "IsBlock": true,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
//         }
//     },
//     {
//         $sort: {
//             Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     }
// ]
//
// // actormessages_by_methodname
// // methodname: count
// // ms ActorID_1_IsBlock_1_MethodName_1_Epoch_1
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "IsBlock": true,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
//         }
//     },
//     {
//         $group: {
//             _id: "$MethodName",
//             Count: {$sum: 1}
//         }
//     }
// ]
//
// // // ms ActorID_1_IsBlock_1_MethodName_1_Epoch_1  2849393-2857798
// // [
// //     {
// //         $match: {
// //             "ActorID": ctx.Addr,
// //             "IsBlock": true,
// //             "MethodName": ctx.MethodName,
// //             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
// //         }
// //     },
// //     {
// //         $group: {
// //             _id: 0,
// //             Count: {$sum: 1}
// //         }
// //     }
// // ]
//
// // page: actor:methodname
// // ms ActorID_1_IsBlock_1_MethodName_1_Epoch_1  todo: Epoch: -1
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "IsBlock": true,
//             "MethodName": ctx.MethodName,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
//         }
//     },
//     {
//         $sort: {
//            Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     }
// ]
//
//
// //transfer_messages
// //totalcount
// // ms todo: 索引没用对
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "ExitCode": 0,
//             "Value": {$gt: "0"},
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
//         }
//     },
//     {
//         $group: {
//             _id: 0,
//             Count: {$sum: 1}
//         }
//     }
// ]
//
// //page
// [
//     {
//         $match: {
//             "ActorID": ctx.Addr,
//             "ExitCode": 0,
//             "Value": {$gt: "0"},
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
//         }
//     },
//     {
//         $sort: {
//             Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     }
// ]
//
//
//
// //transfer_message_for_largeAmount
// //ExecTrace todo: 没用上MsgRct.ExitCode_1_Epoch_-1_Msg.Value_1
// [
//     {
//         $match: {
//             "MsgRct.ExitCode": 0,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
//             "Msg.Value": {$regex: "^.{23,}$"} // 10000Fil
//         }
//     },
//     {
//         $sort: {
//             "Epoch" : -1
//         }
//     },
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
//             Value: "$Msg.Value",
//             Method: "$Msg.MethodName",
//             Depth: "$Depth"
//         }
//     }
// ]
//
//
// // block
// //totalcount
// //40s Depth_1_Epoch_-1_Msg.From_1  //todo:还是要IsBlock字段
// [
//     {
//         $match: {
//             $and: [
//                 {"Depth": 1},
//                 {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
//                 {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
//             ]
//         }
//     },
//     {
//         $group: {
//             _id: 0,
//             Count: {$sum:1}
//         }
//     }
// ]
//
// //page
// [
//     {
//         $match: {
//             $and: [
//                 {"Depth": 1},
//                 {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
//                 {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
//             ]
//         }
//     },
//     {
//         $sort: {
//             Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     }
// ]
//
// // blockmessages_by_methodname
// // totalcount
// //50s
// [
//     {
//         $match: {
//             $and: [
//                 {"Depth": 1},
//                 {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
//                 {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
//             ]
//         }
//     },
//     {
//         $group: {
//             _id: "$Msg.MethodName",
//             Count: {$sum:1}
//         }
//     }
// ]
//
// //page
// [
//     {
//         $match: {
//             $and: [
//                 {"Depth": 1},
//                 {"Msg.MethodName": ctx.MethodName},
//                 {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
//                 {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
//             ]
//         }
//     },
//     {
//         $sort: {
//             Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     }
// ]