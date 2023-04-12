// MinerFunds
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
        }
    },
    {
        $sort: {
            Epoch: -1
        }
    },
    {
        $group: {
            _id: "$Info.Owner"
        }
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1},
            AllOwners: {$addToSet: "$_id"},
        }
    }
]
