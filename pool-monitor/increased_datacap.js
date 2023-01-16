// collection: ExecTraces
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            "Msg.To": "06",
            "Msg.Method": 4,
            "MsgRct.ExitCode": 0
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
                                {$eq: ["$_id", "$$cid"]},
                                {$eq: ["$Detail.Method", "AddVerifiedClient"]}
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
            _id: "$Msg.To",
            increasedDatacap: {
                $sum: {$toDecimal: "$message.Detail.Params.Allowance"}
            }
        }
    }
]
