// EventRoots
[
    {
        $match: {
            _id: ctx.Cid
        }
    },
    {
        $project: {
            _id: 0,
            Events: 1
        }
    }
]