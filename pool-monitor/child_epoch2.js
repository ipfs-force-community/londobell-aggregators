// Tipset
[
    {
        $match: {
            "_id": {$gte: ctx.StartEpoch}
        }
    },
    {
        $sort: {
            "_id": 1
        }
    },
    {
        $limit: 2
    },
    {
        $group: {
            _id:0,
            current: {
                $first: "$$ROOT",
            },
            child: {
                $last: "$$ROOT",
            }
        }
    },
    {
        $project: {
            CurrentTipset: "$current.Cids",
            ChildEpoch: "$child._id",
            ChildTipset: "$child.Cids"
        }
    }
]