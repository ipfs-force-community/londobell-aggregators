// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$or: [
                        {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                        {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                        {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    }
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
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $lookup:
            {
                from: "Message",
                let: {cid: "$Cid"},
                pipeline: [
                    {
                        $match:
                            {
                                $expr: {
                                    $and: [{$eq: [ "$_id", "$$cid"]}]
                                }
                            }
                    }
                ],
                as: "blockmessage"
            }
    },
    {
        $unwind: "$blockmessage"
    },
    {
        $project: {
            _id: 0,
            from: "$blockmessage.From",
            to: "$blockmessage.To",
            method: "$blockmessage.Detail.Method",
            value: "$blockmessage.Value",
            params: "$blockmessage.Detail.Params",
            signed_cid:
                {$cond: {
                    if:{
                        $eq:["$blockmessage.SignedCid", null]
                    }, then: "$blockmessage._id",
                        else: "$blockmessage.SignedCid"
                    }
                },
            gas_used: "$GasCost.GasUsed",
            block_time: {
                $toDate: {$add: [{$toDecimal: {
                            $dateFromString: {
                                dateString: "2020-08-25T06:00:00",//格式："2020-08-25T06:00:00"
                                timezone: "Asia/Shanghai"
                            }
                        }}, {$multiply: ["$Epoch", 30*1000]}]}
            },
            epoch: "$Epoch",
            exit_code: "$MsgRct.ExitCode",
            nonce: "$blockmessage.Nonce",
            return: "$Detail.Return",
            gas_limit: "$blockmessage.GasLimit",
            gas_premium: "$blockmessage.GasPremium",
            gas_fee_cap: "$blockmessage.GasFeeCap",
            version: "$blockmessage.Version",
            gascost: "$GasCost"
        }
    }
]
// , {hint:{"Epoch":1,"Depth":1,"Msg.From":1}}

// todo: cold dbs skip过多慢；热库epoch sort慢，感觉是索引没用好