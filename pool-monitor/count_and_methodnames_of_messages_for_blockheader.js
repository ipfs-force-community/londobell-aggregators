// // MessageBlock
// [
//     {
//         $match: {
//             Blocks: {$in: [ctx.Cid]},
//             Epoch: ctx.StartEpoch
//         }
//     },
//     {
//         $group: {
//             _id: 0,
//             messages: {$addToSet: "$_id"}
//         }
//     },
//     {
//         $lookup: {
//             from: "Message",
//             let: {cids: "$messages"},
//             pipeline: [
//                 {
//                     $match:
//                         {
//                             $expr: {
//                                 $and: [
//                                     {$or: [
//                                             {$in: ["$_id", "$$cids"]},
//                                             {$in: ["$SignedCid", "$$cids"]}
//                                         ]},
//                                     {$eq: ["$Detail.PackedHeight", ctx.StartEpoch]}
//                                 ]
//                             }
//                         }
//                 }
//             ],
//             as: "message"
//         }
//     },
//     {
//         $unwind: "$message"
//     },
//     {
//         $group: {
//             _id: 0,
//             AllMethods: {$addToSet: "$message.Detail.Method"},
//             TotalCount: {$sum: 1}
//         }
//     },
// ]

// BlockMessage
// todo: replace消息
[
{
    $match: {
        _id: ctx.Cid,
        // Epoch: ctx.StartEpoch
    }
},
    {
        $lookup: {
            from: "Message",
            let: {cids: "$Messages", epoch: "$Epoch"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$or: [
                                            {$in: ["$_id", "$$cids"]},
                                            {$in: ["$SignedCid", "$$cids"]}
                                        ]},
                                    {$eq: ["$Detail.PackedHeight", "$$epoch"]}
                                ]
                            }
                        }
                }
            ],
            as: "message"
        }
    },
    {
        $unwind: "$message"
    },
    {
        $group: {
            _id: "$message.Detail.Method",
            Count:{$sum:1}
        }
    }
]