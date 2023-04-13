// // ExecTrace
// [
//     {
//         $match: {
//             $expr: {
//                 $and:[
//                     {$eq: ["$Epoch", ctx.StartEpoch]},
//                     {$eq: ["$Depth", 1]},
//                     {$eq: ["$Msg.From", ctx.Addr]},
//                     {$or: [
//                         {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1]}]},
//                         {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1]}]},
//                         {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1]}]},
//                     ]}
//                 ],
//             }
//         }
//     },
//     {
//         $group: {
//             _id: "$Msg.From",
//             messageCount: {$sum: 1}
//         },
//     }
// ]