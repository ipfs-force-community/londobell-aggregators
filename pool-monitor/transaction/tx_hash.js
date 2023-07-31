// EthHash
[
    {
        $match: {
            Cid: ctx.Cid
        }
    },
    {
        $project: {
            Hash: "$_id"
        }
    }
]