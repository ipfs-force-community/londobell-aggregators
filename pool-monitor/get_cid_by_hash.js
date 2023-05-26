// EthHash
[
    {
        $match: {
            _id: req.Cid
        }
    },
    {
        $project: {
            _id: 0,
            Cid: 1
        }
    }
]