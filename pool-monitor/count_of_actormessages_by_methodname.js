// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $project: {
            _id: 0,
            Cid: "$Cid"
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            _id: 0,
            Method: "$message.Detail.Method",
            From: "$message.From",
            To: "$message.To"
        }
    },
    {
        $group: {
            _id: "$Method",
            all_froms: {$push: "$From"},
            all_tos: {$push: "$To"},
        }
    }
]

// // Message
// [
//     {
//         $match: {
//             $expr: {
//                 $and: [
//                     {$gte: ["$Detail.PackedHeight", ctx.StartEpoch]},
//                     {$lt: ["$Detail.PackedHeight", ctx.EndEpoch]}
//                 ]
//             }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             Method: "$Detail.Method",
//             From: "$From",
//             To: "$To"
//         }
//     },
//     {
//         $group: {
//             _id: "$Method",
//             all_froms: {$push: "$From"},
//             all_tos: {$push: "$To"},
//         }
//     }
// ]