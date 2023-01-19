// Tipset
// todo: nullblock's basefee?
[
    {
        $match: {
            _id: {$gte: ctx.StartEpoch}
        }
    },
    {
        $limit: 1
    }
]