// Tipset
[
    {
        $sort: {"_id": 1}
    },
    {
        $group: {
            _id: 0,
            start: {
                $first: "$$ROOT._id",
            },
            end: {
                $last: "$$ROOT._id",
            }
        }
    }
]
