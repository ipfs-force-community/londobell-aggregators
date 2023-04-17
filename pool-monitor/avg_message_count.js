// ExecTrace
// [
//     {
//         $match: {
//             Epoch: ctx.StartEpoch,
//             Depth: 1,
//             $cond: {
//                 if: {
//                     $ne: ["$ctx.Addr", ""],
//                 },
//                 then: 0,
//                 else: -1,
//             },
//         }
//     },
//
//
// ]

[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$eq: ["$Depth", 1]},
                    {$or: [
                        {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1]}]},
                    ]}
                ]
            }
        }
    },
    {
        $group: {
            _id: 0,
            messageCount: {$sum: 1}
        }
    },
    {
        $addFields: {
            avgMessageCount: {$toInt: {$divide: ["$messageCount", {$subtract: [ctx.EndEpoch, ctx.EndEpoch]}]}}
        }
    }
]