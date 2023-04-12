// ActorBalance
// todo: 整合所有分库记录到一张表
// [
//     {
//         $match: {
//             Epoch: {
//                 $gte: ctx.StartEpoch,
//                 $lt: ctx.EndEpoch
//             },
//             Addr: ctx.Addr,
//         }
//     },
//     {
//         $sort: {
//             "Epoch": 1
//         }
//     }
// ]

// todo: create index: Epoch_1_Addr_1
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr,
        }
    }
]
