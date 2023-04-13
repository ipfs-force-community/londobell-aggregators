// traverse all miners to get specified owner which miners belong to
// MinerFunds
// todo: 不再活跃的miner不记录在表里
// todo: create index Info.Owner
[
    {
        $match: {
            "Info.Owner": ctx.Addr,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch
            }
        }
    },
    {
        $group: {
            _id: "$Info.Owner",
            Miners: {$addToSet: "$Addr"}
        }
    }
]

[
    {$match: {
        "Epoch": {$gt: 0}
        }
    },
        {
            $sort: {
                "Epoch": -1
            }
        },
        {
            $limit: 1
        },
        {
            $project: {
                _id: 0,
                Epoch: "$Epoch"
            }
        }
    ]