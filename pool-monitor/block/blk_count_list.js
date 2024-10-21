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
        $addFields: {
            BlockCount: {$size: "$Cids"},
            BaseFee: "$BaseFee"
        }
    },
    {
        $lookup: {
            from: "BlockHeader",
            let: {
                epoch: "$_id",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$epoch", "$Epoch"]},
                            ],
                        },
                    },
                },
            ],
            as: "blockheader",
        },
    },
    {
        $unwind: "$blockheader",
    },
    {
        $group: {
            _id: "$_id",
            MessageCount: {$sum: "$blockheader.MessageCount"},
            BlockCount: {$sum: 1},
            RedundantBaseFee: {$sum: {$toDecimal: "$BaseFee"}}
        }
    },
    {
        $addFields: {
            BaseFee: {$toString: {$divide: ["$RedundantBaseFee", "$BlockCount"]}}
        }
    }
]