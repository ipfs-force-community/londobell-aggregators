// MessageBlock
[
    {
        $match: {
            Block: {$in: [ctx.Cid]},
            Epoch: ctx.StartEpoch
        }
    },
    {
        $group: {
            _id: 0,
            totalCount: {$sum: 1},
            messages: {$addToSet: "$_id"}
        }
    }
]