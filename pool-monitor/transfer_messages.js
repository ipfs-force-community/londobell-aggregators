// ExecTrace
// todo: parent_from 不为f1、f3、f4时，不显示cid
[
    {
        $match: {
            $and: [
                {"MsgRct.ExitCode": 0},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From": {$in: ctx.Addrs}}, {"Msg.To": {$in: ctx.Addrs}}]}
            ]
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
                                    // { $regexMatch: { input: "$Value", regex: "^.{1,}$" } }
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
    // {
    //     $lookup: {
    //         from: "ExecTrace",
    //         let: {
    //             ids: {$split: ["$_id", "-"]},
    //             epoch: "$Epoch"
    //         },
    //         pipeline: [
    //             {
    //                 $match: {
    //                     $expr: {
    //                         $and: [
    //                             {$eq: ["$Depth", 1]},
    //                             {$eq: ["$Epoch", "$$epoch"]},
    //                             {$eq: ["$_id", {$concat: [{$arrayElemAt: ["$$ids", 0]}, "-", {$arrayElemAt: ["$$ids", 1]}]}]},
    //                         ],
    //                     },
    //                 },
    //             },
    //         ],
    //         as: "parentTrace",
    //     }
    // },
    // {
    //     $unwind: "$parentTrace"
    // },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            _id: 0,
            Cid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$Cid",
                    else: "$SignedCid"
                }
            },
            // parent_from: "$parentTrace.Msg.From",
            Epoch: "$Epoch",
            From: "$message.From",
            To: "$message.To",
            Value: "$message.Value",
            Method: "$message.Detail.Method",
            Depth: "$Depth"
            // Method: {
            //     $cond: {
            //         if: {
            //             $in: ["$Msg.From", ctx.Addrs],
            //         },
            //         then: 0,
            //         else:1,
            //     },
            // } // 0: send; 1: receive;
            // // for miner method=1 & from="02":区块奖励; method=0:其他惩罚(暂不细分)
        }
    },
    // {
    //     $addFields: {
    //         Cid: {
    //             $cond: {
    //                 if: {
    //                     $or: [
    //                         {$eq: ["1", {$substrBytes: ["$parent_from", 0, 1] }]},
    //                         {$eq: ["3", {$substrBytes: ["$parent_from", 0, 1] }]},
    //                         {$eq: ["4", {$substrBytes: ["$parent_from", 0, 1] }]}
    //                     ]
    //                 }, then: {
    //                     $cond: {
    //                         if:{
    //                             $eq:["$parentTrace.SignedCid", null]
    //                         }, then: "$parentTrace.Cid",
    //                         else: "$parentTrace.SignedCid"
    //                     }
    //                 },
    //                 else: ""
    //             }
    //         }
    //     }
    // }
]
