// ExecTrace
// todo: account的Constructor没有存？
[
    {
        $match: {
            IsBlock: false,
            "MsgRct.ExitCode": 0,
            "Msg.MethodName": "Constructor",
            "Msg.From": "01",
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
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
                                {$regexMatch: { input: "$Detail.Actor", regex: ctx.ActorType}},
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
            NewActors: {$addToSet: "$Msg.To"}
        }
    }
]