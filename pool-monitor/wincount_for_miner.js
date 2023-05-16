// ExecTrace
[
    {
        $match: {
            Depth: 1,
            "Msg.From": "00",
            "Msg.To": "02",
            "Msg.Method": 2,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        },
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$Cid"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$_id"]},
                                {$eq: ["$Detail.Params.Miner", ctx.Addr]},
                            ],
                        },
                    },
                },
            ],
            as: "message",
        },
    },
    {
        $unwind: "$message",
    },
    {
        $group: {
            _id: 0,
            TotalWincount: {
                $sum: "$message.Detail.Params.WinCount",
            },
            TotalGasReward: { //get for per epoch
                $sum: {$toDecimal: "$message.Detail.Params.GasReward"}
            }
        },
    },
]
