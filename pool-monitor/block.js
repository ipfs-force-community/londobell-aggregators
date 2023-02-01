[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            "Depth": 1
        }
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
        $match: {
            $expr: {
                $or: [ //todo: 4
                    {$eq: ["1", {$substrBytes: ["$blockmessage.From", 0, 1] }]},
                    {$eq: ["3", {$substrBytes: ["$blockmessage.From", 0, 1] }]},
                ]
            }
        }
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
