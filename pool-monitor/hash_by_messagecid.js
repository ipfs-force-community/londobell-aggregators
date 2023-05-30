// EthHash
[
    {
        $match: {
            Cid: ctx.Cid
        }
    },
    {
        $project: {
            _id: 0,
            Hash: "$_id",
        }
    }
]