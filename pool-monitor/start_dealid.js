// DealProposal
[
    {
        $match: {
            "Epoch": {$gt: ctx.StartEpoch}
        }
    },
    {
        $sort: {
         "Epoch": 1, "_id": 1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            StartDealID: "$_id",
        }
    }
]
