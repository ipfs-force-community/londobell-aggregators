// BlockHeader
// deprecated
[
    {
        $match: {
            "Epoch": ctx.StartEpoch
        }
    },
    {
        $lookup: {
            from: "Tipset",
            localField: "Epoch",
            foreignField: "ChildEpoch",
            as: "tipset",
        },
    },
    {
        $unwind: "$tipset",
    },
    {
        $project: {
            Epoch: "$Epoch",
            Miner: "$Miner",
            Messages: "$Messages",
            ElectionProof: "$ElectionProof",
            Ticket: "$Ticket",
            MessageCount: "$MessageCount",
            Parents: "$tipset.Cids",
            ParentWeight: "$tipset.Weight",
            ParentStateRoot: "$tipset.State",
            ParentMessageReceipts: "$tipset.Receipts",
            ParentBaseFee: "$tipset.BaseFee",
        }
    }
]