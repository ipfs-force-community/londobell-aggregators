// ExecTrace
// todo: parent_from 不为f1、f3、f4时，不显示cid
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
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $sort: {
            "Epoch": -1
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
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            _id: 0,
            // signed_cid: {
            //     $cond: {
            //         if:{
            //             $eq:["$parentTrace.SignedCid", null]
            //         }, then: "$parentTrace.Cid",
            //         else: "$parentTrace.SignedCid"
            //     }
            // },
            parent_from: "$parentTrace.Msg.From",
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
    },
    {
        $addFields: {
            signed_cid: {
                $cond: {
                    if: {
                        $or: [
                            {$eq: ["1", {$substrBytes: ["$parent_from", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$parent_from", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$parent_from", 0, 1] }]}
                        ]
                    }, then: {
                        $cond: {
                            if:{
                                $eq:["$parentTrace.SignedCid", null]
                            }, then: "$parentTrace.Cid",
                            else: "$parentTrace.SignedCid"
                        }
                    },
                    else: ""
                }
            }
        }
    }

]
