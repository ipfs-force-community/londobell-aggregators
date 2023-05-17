// ExecTrace
[
    {
        $match: {
            "MsgRct.ExitCode": 0,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            "Msg.Value": {$ne:"0"},
        }
    },
    {
        $project: {
            _id: 0,
            "Msg.From": 1,
            "Msg.To": 1
        }
    },
    {
        $project: {
           From: "$Msg.From",
            To: "$Msg.To",
        }
    }
]