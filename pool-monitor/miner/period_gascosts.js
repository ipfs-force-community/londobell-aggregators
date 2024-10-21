// ActorMessage
// ActorID is miner
[
    {
        $match: {
            ActorID: ctx.Addr,
            IsBlock: true,
            // Type: "from",
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                ids: {$split: ["$_id", "-"]},
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", {$concat: [{$arrayElemAt: ["$$ids", 0]}, "-", {$arrayElemAt: ["$$ids", 1]}]}]},
                            ],
                        },
                    },
                },
            ],
            as: "trace"
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $group: {
            _id: "$trace.Msg.MethodName",
            GasCosts: {$sum: {$toDecimal: "$trace.GasCost.TotalCost"}},
            Values: {$sum: {$toDecimal: "$trace.Msg.Value"}}
        }
    }
]
