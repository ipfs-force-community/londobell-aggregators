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
        },
    },
    {
        $group: {
            _id: "$Msg.To",
        },
    },
]