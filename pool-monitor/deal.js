// DealProposal
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch, //
                $lt: ctx.EndEpoch, //
            },
        },
    },
    {
        $sort: {
            "_id": -1
        }
    },
    {
        $limit: ctx.Count
    }
]