// DealProposal
[
    {
        $match: {
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
         "Epoch": ctx.Sort, "_id": ctx.Sort
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            DealID: "$_id",
        }
    }
]
