// DealProposal
[
    {
        $match: {
            "Epoch": {$gt: ctx.StartEpoch} // Start: DealProposal的首epoch
        }
    },
    {
        $sort: {
            "Epoch": -1, "_id": -1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            EndDealID: "$_id",
        }
    }
]
