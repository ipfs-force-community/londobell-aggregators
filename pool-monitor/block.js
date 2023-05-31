// ExplicitMessage
//],{hint:"MsgRct.ExitCode_1_Epoch_-1_Msg.From_1_Msg.To_1"})
//]), {hint:{"Epoch":1,"Depth":1,"Msg.From":1}}
// todo: cold dbs skip过多慢；热库epoch sort慢，感觉是索引没用好
[
    {
        $match: {
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
        $project: {
            _id: 0,
            From: "$From",
            To: "$To",
            Method: "$MethodName",
            Value: "$Value",
            SignedCid: "$_id",
            BlockTime: {
                $toDate: {$add: [{$toDecimal: {
                            $dateFromString: {
                                dateString: "2020-08-25T06:00:00",//格式："2020-08-25T06:00:00"
                                timezone: "Asia/Shanghai"
                            }
                        }}, {$multiply: ["$Epoch", 30*1000]}]}
            },
            Epoch: "$Epoch",
            ExitCode: "$ExitCode",
        }
    }
]
