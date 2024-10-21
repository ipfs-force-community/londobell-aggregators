// Tipset
[
    {
        $match: {
            _id: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]