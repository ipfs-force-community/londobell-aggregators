// ExecTrace
// todo: evmactor CreateExternal(just for display, not belong to actor)
// todo: ctx.Addr 使用robust & ID
[
    {
        $match: {
            $expr: {
                $and: [
                    {$or: [
                        {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1]}]},
                        {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1]}]},
                    ]},
                    {$or:[
                        {$in: ["$Msg.From", ctx.Addrs]},
                        {$in: ["$Msg.To", ctx.Addrs]}
                        ]
                    },
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $project: {
            "_id": 0,
            "Cid": 1,
            "Epoch": 1,
            "MsgRct.ExitCode": 1
        }
    },
    {
        $sort: {
            "Epoch": -1
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
                                ]
                            }
                        }
                },
                {
                    $project: {
                        _id: 1,
                        "SignedCid": 1,
                        "From": 1,
                        "To": 1,
                        "Value": 1,
                        "Detail.Method": 1
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
            Cid: {
                $cond: {
                    if:{
                        $eq:["$message.SignedCid", null]
                    }, then: "$message._id",
                    else: "$message.SignedCid"
                }
            },
            Epoch: "$Epoch",
            From: "$message.From",
            To: "$message.To",
            Value: "$message.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$message.Detail.Method",
        }
    }
]