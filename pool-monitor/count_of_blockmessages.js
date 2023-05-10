// // ExecTrace
// [
//     {
//         $match: {
//             $expr: {
//                 $and: [
//                     {$eq: ["$Depth", 1]},
//                     {$or: [
//                             {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
//                             {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
//                             {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
//                         ]
//                     }
//                 ]
//             }
//         }
//     }
// ]