// Tipset
[
    {
        $match: {
            _id: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "_id": ctx.Sort,
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            Epoch: "$Epoch",
            Cids: "$Cids",
            Weight: "$Weight",
            StateRoot: "$State",
            MessageReceipts: "$Receipts",
            BaseFee: "$BaseFee",
            MinTimestamp: "$MinTimestamp",
        }
    }
]