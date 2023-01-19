// ExecTrace
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Depth: 2,
            "Msg.From": "02",
            "Msg.Method": 14,
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$_id"]},
                                {$eq: ["$Detail.Method", "ApplyRewards"]},
                            ],
                        },
                    },
                },
            ],
            as: "message",
        },
    },
    {
        $unwind: "$message"
    },
    {
        $group: {
            _id: 0,
            blockRewards: {$sum: {$toDecimal: "$message.Value"}},
            blockCounts: {$sum: 1}
        }
    }
]