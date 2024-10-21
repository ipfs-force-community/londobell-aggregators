// EthHash
[
    {
        $match: {
            _id: ctx.Cid
        }
    },
    {
        $project: {
            _id: 0,
            Cid: 1
        }
    }
]