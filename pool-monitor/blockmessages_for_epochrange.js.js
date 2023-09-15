// BlockMessage
[
    {
        $match: {
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            Epoch: -1
        }
    },
    {
        $project: {
            BlockCid: "$_id",
            Epoch: "$Epoch",
            Messages: "$Messages"
        }
    }
]