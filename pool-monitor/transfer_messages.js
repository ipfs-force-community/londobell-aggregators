// ExecTrace
[
    {
        $match: {
            $expr: {
                $and: [
                    {$or:[
                            {$eq: ["$Msg.From", ctx.Addr]},
                            {$eq: ["$Msg.To", ctx.Addr]}
                        ]
                    },
                    {$eq: ["$MsgRct.ExitCode", 0]},
                    {$eq: ["$Epoch", ctx.StartEpoch]}
                ]
            }
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {cid: "$Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$_id", "$$cid"]},
                                    {$gt: [{$toDecimal: "$Value"}, 0]}
                                ]
                            }
                        }
                }
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                ids: {$split: ["$_id", "-"]},
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Depth", 1]},
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$eq: ["$_id", {$concat: [{$arrayElemAt: ["$$ids", 0]}, "-", {$arrayElemAt: ["$$ids", 1]}]}]},
                            ],
                        },
                    },
                },
            ],
            as: "parentTrace",
        }
    },
    {
        $unwind: "$parentTrace"
    },
    {
        $project: {
            _id: 0,
            signed_cid: {
                $cond: {
                    if:{
                        $eq:["$parentTrace.SignedCid", null]
                    }, then: "$parentTrace.Cid",
                    else: "$parentTrace.SignedCid"
                }
            },
            epoch: "$Epoch",
            from: "$message.From",
            to: "$message.To",
            value: "$message.Value",
            method: {
                $cond: {
                    if: {
                        $eq: ["$Msg.From", ctx.Addr],
                    },
                    then: 0,
                    else:1,
                },
            } // 0: send; 1: receive;
            // for miner method=1 & from="02":区块奖励; method=0:其他惩罚(暂不细分)
        }
    }
]
