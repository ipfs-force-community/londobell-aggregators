// Tipset
[
    {
        $match: {
            "_id": {$lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "_id":-1
        }
    },
    {
        $limit: 1
    }
]
