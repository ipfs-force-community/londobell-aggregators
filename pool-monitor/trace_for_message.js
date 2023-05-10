// ExecTrace
// Sort by method name
// todo: db.ExecTrace.createIndex({"Epoch":1,"SubCallCount":1}, {"sparse": true});
// only allow to search explicit messages
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {$or: [{"Cid": ctx.Cid}, {"SignedCid": ctx.Cid}]},
                {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
            ]
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