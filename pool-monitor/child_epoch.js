[
    {
        $match: {
            "_id": ctx.StartEpoch
        }
    },
    {
        $project: {
            ChildEpoch: "$ChildEpoch"
        }
    }
]
