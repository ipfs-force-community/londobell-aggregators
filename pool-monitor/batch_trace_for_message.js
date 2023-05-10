// ExecTrace
// Sort by method name
// todo: 分库查询
// todo: db.ExecTrace.createIndex({"Epoch":1,"SubCallCount":1}, {"sparse": true});
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
                {$or: [{"Cid": {$in: ctx.Cids}}, {"SignedCid": {$in: ctx.Cids}}]}
            ]

            // $expr: {
            //     $and: [
            //         {$eq: ["$Depth", 1]}, // not inclued cron, which may contained burn pledge
            //         {$or: [
            //                 {$in: ["$Cid", ctx.Cids]},
            //                 {$in: ["$SignedCid", ctx.Cids]}
            //             ]},
            //         {$or: [
            //                 {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
            //                 {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
            //                 {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
            //             ]
            //         },
            //         {$gte: ["$Epoch", ctx.StartEpoch]},
            //         {$lt: ["$Epoch", ctx.EndEpoch]},
            //     ]
            // }
        }
    },
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
            Cid: {
                $cond: {
                    if:{
                        $eq:["$message.SignedCid", null]
                    }, then: "$message._id",
                    else: "$message.SignedCid"
                }
            },
            Epoch: "$Epoch",
            Value: "$message.Value",
            From: "$message.From",
            To: "$message.To",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$message.Detail.Method",
            Params: "$message.Params", // []byte
            Return: "$MsgRct.Return",
            ParamsDetail: "$message.Detail.Params",
            ReturnDetail: "$Detail.Return",
            Version: "$message.Version",
            Nonce: "$message.Nonce",
            GasLimit: "$message.GasLimit",
            GasFeeCap: "$message.GasFeeCap",
            GasPremium: "$message.GasPremium",
            GasCost: "$GasCost"
        }
    }
]