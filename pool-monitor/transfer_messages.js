// ExecTrace
// just for send method
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
                    {$eq: ["$Msg.Method", 0]},
                    {$eq: ["$MsgRct.ExitCode", 0]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            _id: 0,
            signed_cid: {
                $cond: {
                    if:{
                        $eq:["$message.SignedCid", null]
                    }, then: "$message._id",
                    else: "$message.SignedCid"
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
