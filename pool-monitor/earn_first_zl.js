[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            Depth: 2,
            "Msg.From": "02",
            "Msg.Method": 14,
            SubCallCount: 1,
        },
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "blockrewardMatches",
        },
    },
    {
        $unwind: "$blockrewardMatches",
    },
    {
        $sort: {
            Epoch: 1,
        },
    },
    {
        $limit:1
    },
    {
        $group:{
            _id:"$Epoch",
            Reward:{
                $sum:{
                    $divide: [
                        {
                            $toDecimal: "$blockrewardMatches.Value",
                        },
                        1e18,
                    ],
                },
            },
        },
    }
]
