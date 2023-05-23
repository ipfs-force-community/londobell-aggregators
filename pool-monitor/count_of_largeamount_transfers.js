// ExecTrace
[
    {
        $match: {
            "MsgRct.ExitCode": 0,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Msg.Value": {$regex: "^.{23,}$"} // todo: 2e22
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