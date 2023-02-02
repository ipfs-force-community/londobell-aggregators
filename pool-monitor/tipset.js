// Tipset
// todo: nullblock's basefee?
[
    {
        $match: {
            _id: ctx.StartEpoch
        }
    }
]