//ActorBalance
[
    {
        $match: {
            "Addresses":{$in: [ctx.Addr]}
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            Addresses: 1
        }
    }
]
