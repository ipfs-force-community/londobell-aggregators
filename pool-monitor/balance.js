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

[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr,
        }
    }
]
