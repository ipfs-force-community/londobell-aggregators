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
            ChildEpoch: {
                $cond: {
                    if: {
                        $eq: ["$current._id", "$child._id"]
                    }, then: 0,
                    else: "$child._id"
                }
            },
            ChildTipset: {
                $cond: {
                    if: {
                        $eq: ["$current._id", "$child._id"]
                    }, then: null,
                    else: "$child.Cids"
                }
            }
        }
    }
]