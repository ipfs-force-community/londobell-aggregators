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
    }

]