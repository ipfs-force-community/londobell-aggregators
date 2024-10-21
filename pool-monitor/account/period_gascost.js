// ActorMessage
[
    {
        $match: {
            ActorID: ctx.Addr,
            IsBlock: true,
            Type: "from",
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                cid: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$Cid"]},
                            ],
                        },
                    },
                },
            ],
            as: "trace",
        },
    },
    {
        $unwind: "$trace",
    },
    {
        $group: {
            _id: 0,
            TotalGasCost: {$sum: {$toDecimal: "$GasCost.TotalCost"}}
        }
    }
]