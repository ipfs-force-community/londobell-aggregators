// 临时库TipSet
[
    {
        $sort: {
            "_id": -1,
        }
    },
    {
        $limit: 1
    },
]