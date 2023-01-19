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
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            Depth: 1,
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