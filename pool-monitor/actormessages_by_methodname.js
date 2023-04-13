// ExecTrace
// todo: create index
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
                            {$in: ["$Msg.From", ctx.Addrs]},
                            {$in: ["$Msg.To", ctx.Addrs]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $sort: {
            Epoch: -1
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
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            _id: 0,
            SignedCid:
                {$cond: {
                        if:{
                            $eq:["$message.SignedCid", null]
                        }, then: "$message._id",
                        else: "$message.SignedCid"
                    }
                },
            Epoch: "$Epoch",
            From: "$Msg.From",
            To: "$Msg.To",
            Value: "$message.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$message.Detail.Method"
        }
    }
]
