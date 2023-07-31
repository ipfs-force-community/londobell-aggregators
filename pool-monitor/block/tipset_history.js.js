// Tipset
[
    {
        $match: {
            _id: ctx.StartEpoch
        }
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