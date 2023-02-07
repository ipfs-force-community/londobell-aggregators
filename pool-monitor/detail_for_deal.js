// DealProposal
[
    {
        $match: {
            _id: ctx.ID,
        },
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                id: "$_id",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Msg.To", "05"]},
                                {$eq: ["$Msg.Method", 4]},
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$in: ["$$id", "$Detail.Return.IDs"]}
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