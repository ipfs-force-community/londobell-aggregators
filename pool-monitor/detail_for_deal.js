// DealProposal
[
    {
        $match: {
            _id: ctx.ID,
        },
    },
    // {
    //     $sort: {
    //         "Epoch": -1,
    //     }
    // },
    // {
    //     $limit: 1
    // },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                id: "$_id",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Msg.To", "05"]},
                                {$eq: ["$Msg.Method", 4]},
                                {$eq: [true, {$in: ["$$id", "$Detail.Return.IDs"]}]}
                            ],
                        },
                    },
                },
            ],
            as: "trace",
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $project: {
            DealID: "$_id",
            Epoch: "$trace.Epoch",
            Cid: "$trace.Cid",
            PieceCID: "$PieceCID",
            VerifiedDeal: "$VerifiedDeal",
            Client: "$Client",
            Provider: "$Provider",
            ProviderCollateral: "$ProviderCollateral",
            ClientCollateral: "$ClientCollateral",
            StartEpoch: "$StartEpoch",
            EndEpoch: "$EndEpoch",
            PieceSize: "$PieceSize",
            StoragePricePerEpoch: "$StoragePricePerEpoch"
        }
    }
]


[
    {
        $match: {
            "Detail.Return.IDs": {$in: 8425}
        }
    }
    ]