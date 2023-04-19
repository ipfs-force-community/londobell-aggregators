// // MessageBlock
// [
//     {
//         $match: {
//             _id: ctx.Cid
//         }
//     }
// ]

// BlockMessage
[
    {
        $match: {
            Messages: {$in: [ctx.Cid]},
            Epoch: {$gte: 0}
        }
    },
    {
        $group: {
            _id: 0,
            Blocks: {$addToSet: "$_id"}
        }
    },
]