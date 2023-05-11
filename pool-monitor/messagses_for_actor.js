// ExecTrace
// todo: evmactor CreateExternal(just for display, not belong to actor)
// todo: ctx.Addr 使用robust & ID
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From": {$in: ctx.Addrs}}, {"Msg.To": {$in: ctx.Addrs}}]} // todo: 耗时
            ]
        }
    },
    // {
    //     $project: {
    //         "_id": 0,
    //         "Cid": 1,
    //         "Epoch": 1,
    //         "MsgRct.ExitCode": 1
    //     }
    // },
    {
        $sort: {
            "Epoch": -1
        }
    },
    // {
    //     $lookup:  {
    //         from: "Message",
    //         let: {cid: "$Cid"},
    //         pipeline: [
    //             {
    //                 $match:
    //                     {
    //                         $expr: {
    //                             $and: [
    //                                 {$eq: [ "$_id", "$$cid"]},
    //                             ]
    //                         }
    //                     }
    //             },
    //             {
    //                 $project: {
    //                     _id: 1,
    //                     "SignedCid": 1,
    //                     "From": 1,
    //                     "To": 1,
    //                     "Value": 1,
    //                     "Detail.Method": 1
    //                 }
    //             }
    //         ],
    //         as: "message"
    //     }
    // },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        },
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            _id: 0,
            Epoch: 1,
            "MsgRct.ExitCode": 1,
            "message.SignedCid": 1,
            "message._id": 1,
            "message.From": 1,
            "message.To": 1,
            "message.Value": 1,
            "message.Detail.Method": 1
        }
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