// // ExecTrace
// // todo: 还包括一条创建消息
// [
//     {
//         $match: {
//             $expr:
//                 {$and: [
//                         {$eq: ["$Depth", 1]},
//                         {$gte: ["$Epoch", ctx.StartEpoch]},
//                         {$lt: ["$Epoch", ctx.EndEpoch]},
//                         {$or: [
//                                 {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
//                                 {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
//                                 {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
//                             ]
//                         },
//                         {$or:[
//                                 {$eq: ["$Msg.To", ctx.Addr]},
//                                 {$eq: ["$Msg.From", ctx.Addr]}
//                             ]}
//                     ]}
//         }
//     },
//
// ]
