// ExecTrace
// todo: create index
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                // {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
                {"MsgRct.GasUsed": {$gt: 0}},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From": {$in: ctx.Addrs}}, {"Msg.To": {$in: ctx.Addrs}}]},
            ]
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
