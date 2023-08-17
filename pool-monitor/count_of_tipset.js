// Tipset
[
    {
        $match: {
            _id: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1}
        }
    }
]