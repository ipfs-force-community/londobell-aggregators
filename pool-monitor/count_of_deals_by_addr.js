// DealProposal
[
    {
        $match: {
            $and: [
                {"_id": {$gte: ctx.Start, $lt: ctx.End}},
                {$or: [{"ProviderID": ctx.Addr}, {"ClientID": ctx.Addr}]}
            ]
        },
    },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1}
        }
    }
]