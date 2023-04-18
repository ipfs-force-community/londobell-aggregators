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
            Epoch: ctx.StartEpoch
        }
    },
    {
        $group: {
            _id: 0,
            Blocks: {$addToSet: "$_id"}
        }
    },
]