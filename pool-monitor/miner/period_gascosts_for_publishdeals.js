// Message
// db.Message.createIndex({"Detail.Method":1,"Detail.PackedHeight":1,"Detail.Params.Deals.Proposal.Provider":1}, {"sparse": true});
[
    {
        $match: {
            "Detail.Method": "PublishStorageDeals",
            "Detail.PackedHeight": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Detail.Params.Deals.Proposal.Provider": {$in: ctx.Addrs}
        },
    },
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
                                {$eq: ["$Cid","$$id"]},
                            ],
                        },
                    },
                },
            ],
            as: "trace"
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $group: {
            _id: "$trace.Msg.MethodName",
            GasCosts: {$sum: {$toDecimal: "$trace.GasCost.TotalCost"}},
            Values: {$sum: {$toDecimal: "$trace.Msg.Value"}}
        }
    }
]
