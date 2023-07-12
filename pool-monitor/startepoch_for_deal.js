// DealProposal
[
    {
        $match: {
            Epoch: {$gte: 0}
        }
    },
    {
        $sort: {Epoch: 1}
    },
    {
        $limit: 1
    },
    {
        $project: {
            Epoch : "$Epoch"
        }
    }
]