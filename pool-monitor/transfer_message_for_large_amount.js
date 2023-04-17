// ExecTrace
// todo: 只包含显式Send方法？ 内部调用方法value较大（比如引入智能合约后）？
[
    {
        $match: {
            "Epoch": ctx.StartEpoch,
            "MsgRct.ExitCode": 0
        }
    },
    {
        $lookup: {
            from: "Message",
            let: {
                mcid: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$mcid"]},
                                {$gte: [{$toDecimal: "$Value"}, 1e19]}, // todo: 2e22
                            ],
                        },
                    },
                },
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
        $lookup: {
            from: "Message",
            let: {cid: "$parentTrace.Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$_id", "$$cid"]}
                                ]
                            }
                        }
                }
            ],
            as: "parentMessage",
        }
    },
    {
        $unwind: "$parentMessage",
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
            method: "$parentMessage.Detail.Method"
        }
    }
]