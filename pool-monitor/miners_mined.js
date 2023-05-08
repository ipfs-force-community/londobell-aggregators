[
    {
        $match: {
            Depth: 2,
            "Msg.From": "02",
            "Msg.Method": 14,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        },
    },
    {
        $group: {
            _id: "$Msg.To",
        },
    },
]
