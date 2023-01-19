// MinerFunds
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch
            }
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
            count: {$sum: 1},
            allOwners: {$addToSet: "$_id"},
        }
    }
]
