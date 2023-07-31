// ActorMessage
// miner总值/miner根据epoch列举/所有miner总值列举
[
    {
        $match: {
            "ActorID": ctx.Addr,
            IsBlock: false,
            "From": "02",
            "MethodName": "ApplyRewards",
            "Type": "to",
            "ExitCode": 0,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        },
    },
    {
        $group: {
            _id: 0,
            BlockRewards: {
                $sum: {
                    $toDecimal: "$Value",
                },
            },
            BlockCounts: {
                $sum: 1,
            },
        },
    },
]
