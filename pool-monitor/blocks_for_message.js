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
    {
        $lookup: {
            from: "BlockHeader",
            let: {cids: "$Blocks"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$in: ["$_id", "$$cids"]}
                                ]
                            }
                        }
                }
            ],
            as: "blockheader"
        }
    },
    {
        $unwind: "$blockheader"
    },
    {
        $project: {
            _id: "$blockheader._id",
            Miner: "$blockheader.Miner",
            Epoch: "$blockheader.Epoch",
            Messages: "$blockheader.Messages",
            ElectionProof: "$blockheader.ElectionProof",
            Ticket: "$blockheader.Ticket",
            MessageCount: "$blockheader.MessageCount"
        }
    }

]