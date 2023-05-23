// ExecTrace
//],{hint:"MsgRct.ExitCode_1_Epoch_-1_Msg.From_1_Msg.To_1"})
//]), {hint:{"Epoch":1,"Depth":1,"Msg.From":1}}
// todo: cold dbs skip过多慢；热库epoch sort慢，感觉是索引没用好
[
    {
        $match: {
            "IsBlock": true,
            "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            Epoch: -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "blockmessage",
        },
    },
    {
        $unwind: "$blockmessage"
    },
    {
        $project: {
            _id: 0,
            From: "$blockmessage.From",
            To: "$blockmessage.To",
            Method: "$blockmessage.Detail.Method",
            Value: "$blockmessage.Value",
            Params: "$blockmessage.Detail.Params",
            SignedCid:
                {$cond: {
                    if:{
                        $eq:["$blockmessage.SignedCid", null]
                    }, then: "$blockmessage._id",
                        else: "$blockmessage.SignedCid"
                    }
                },
            GasUsed: "$GasCost.GasUsed",
            BlockTime: {
                $toDate: {$add: [{$toDecimal: {
                            $dateFromString: {
                                dateString: "2020-08-25T06:00:00",//格式："2020-08-25T06:00:00"
                                timezone: "Asia/Shanghai"
                            }
                        }}, {$multiply: ["$Epoch", 30*1000]}]}
            },
            Epoch: "$Epoch",
            ExitCode: "$MsgRct.ExitCode",
            Nonce: "$blockmessage.Nonce",
            Return: "$Detail.Return",
            GasLimit: "$blockmessage.GasLimit",
            GasPremium: "$blockmessage.GasPremium",
            GasFeeCap: "$blockmessage.GasFeeCap",
            Version: "$blockmessage.Version",
            GasCost: "$GasCost"
        }
    }
]
