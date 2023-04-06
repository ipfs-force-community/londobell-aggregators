// Message 差不多 90个高度2秒
//Detail.PackedHeight_1_From_1_Detail.Method_1
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Detail.PackedHeight", ctx.StartEpoch]},
                    {$lt: ["$Detail.PackedHeight", ctx.EndEpoch]},
                    // {$eq: ["$Depth", 1]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$From", 0, 1] }]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $project: {
            _id: 0,
            Cid: "$_id",
            Epoch: "$Detail.PackedHeight",
            Method: "$Detail.Method"
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                cid: "$Cid",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$Cid", "$$cid"]},
                                    {$eq: ["$Depth", 1]},
                                    {$eq: ["$Epoch", "$$epoch"]},
                                ]
                            }
                        }
                }
            ],
            as: "trace"
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $project: {
            _id: 0,
            method: "$Method"
        }
    },
    {
        $group: {
            _id: "$method",
            count: {$sum: 1}
        }
    }
]
