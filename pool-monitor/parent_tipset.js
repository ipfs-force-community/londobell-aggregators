// Tipset
[
    {
        $match: {
            "_id": {$lt: ctx.StartEpoch}
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
