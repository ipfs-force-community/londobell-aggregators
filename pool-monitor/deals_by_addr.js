// DealProposal
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Epoch", ctx.StartEpoch]},
                    {$or: [
                            {$in: ["$Client", ctx.Addrs]},
                            {$in: ["$Provider", ctx.Addrs]}
                        ]
                    }
                ]
            }
        },
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]
