// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}, // todo: range epoch query too slow
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    },
                    {$or:[
                            {$eq: ["$Msg.From", ctx.Addr]},
                            {$eq: ["$Msg.To", ctx.Addr]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $lookup:  {
            from: "Message",
            let: {cid: "$Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: [ "$_id", "$$cid"]},
                                    {$eq: ["$Detail.Method", ctx.MethodName]},
                                ]
                            }
                        }
                }
            ],
            as: "message"
        }
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            _id: 0,
            signed_cid:
                {$cond: {
                        if:{
                            $eq:["$message.SignedCid", null]
                        }, then: "$message._id",
                        else: "$message.SignedCid"
                    }
                },
            epoch: "$Epoch",
            from: "$Msg.From",
            to: "$Msg.To",
            value: "$message.Value",
            exit_code: "$MsgRct.ExitCode",
            method: "$message.Detail.Method"
        }
    }
]
