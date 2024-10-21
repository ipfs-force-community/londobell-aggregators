// ExecTrace
[
    {
        $match: {
            "MsgRct.ExitCode": 0,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "FIL": {$gte: 10000} // todo 与之前逻辑一致,后续可以作为参数传入
        }
    },
    // {
    //     $project: {
    //         _id: 0,
    //         Cid: 1
    //     }
    // },
    {
        $group: {
            _id: 0,
            Count: {$sum: 1}
        }
    }
]