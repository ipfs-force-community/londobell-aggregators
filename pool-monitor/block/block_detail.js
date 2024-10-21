// BlockHeader
// todo: 不算一个表里的上一条记录或下一条记录，分库不好做
[
    {
        $match: {
            "_id": ctx.Cid
        }
    },
    // {
    //     $lookup: {
    //         from: "Tipset",
    //         localField: "Epoch",
    //         foreignField: "ChildEpoch",
    //         as: "tipset",
    //     },
    // },
    // {
    //     $unwind: "$tipset",
    // },
    {
        $project: {
            Epoch: "$Epoch",
            Miner: "$Miner",
            Messages: "$Messages",
            ElectionProof: "$ElectionProof",
            Ticket: "$Ticket",
            MessageCount: "$MessageCount",
            // Parents: "$tipset.Cids",
            // ParentWeight: "$tipset.Weight",
            // ParentStateRoot: "$tipset.State",
            // ParentMessageReceipts: "$tipset.Receipts",
            // ParentBaseFee: "$tipset.BaseFee",
        }
    }
]