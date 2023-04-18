// // MessageBlock
// [
//     {
//         $match: {
//             Blocks: {$in: [ctx.Cid]},
//             Epoch: ctx.StartEpoch
//         }
//     },
//     {
//         $group: {
//             _id: 0,
//             // totalCount: {$sum: 1},
//             messages: {$addToSet: "$_id"}
//         }
//     },
//     {
//         $lookup: {
//             from: "ExecTrace",
//             let: {cids: "$messages"},
//             pipeline: [
//                 {
//                     $match:
//                         {
//                             $expr: {
//                                 $and: [
//                                     {$or: [
//                                             {$in: ["$Cid", "$$cids"]},
//                                             {$in: ["$SignedCid", "$$cids"]}
//                                         ]},
//                                     {$eq:["$Epoch",ctx.StartEpoch]},
//                                 ]
//                             }
//                         }
//                 }
//             ],
//             as: "trace"
//         }
//     },
//     {
//         $unwind: "$trace"
//     },
//     //todo: SignedCid始终为替换前的cid, 如果SignedCid为空null，说明该条消息未被替换；block中替换前的消息不应该有epoch和返回值
//     {
//         $addFields: {
//             Cid: {
//                 $cond: {
//                     if: {
//                         $eq: ["$trace.SignedCid", null]
//                     }, then: "$trace.Cid",
//                     else: "$trace.SignedCid"
//                 }
//             },
//         }
//     },
//     {
//         $sort: {
//             Cid: 1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     },
//     {
//         $lookup: {
//             from: "Message",
//             let: {cid: "$Cid"},
//             pipeline: [
//                 {
//                     $match:
//                         {
//                             $expr: {
//                                 $and: [
//                                     {$or: [
//                                             {$eq: ["$_id", "$$cid"]},
//                                             {$eq: ["$SignedCid", "$$cid"]}
//                                         ]},
//                                 ]
//                             }
//                         }
//                 }
//             ],
//             as: "message"
//         }
//     },
//     {
//         $unwind: "$message"
//     },
//     {
//         $project: {
//             Cid: "$Cid",
//             Epoch: "$Epoch",
//             Value: "$message.Value",
//             From: "$message.From",
//             To: "$message.To",
//             ExitCode: "$trace.MsgRct.ExitCode",
//             Method: "$message.Detail.Method",
//             Params: "$message.Params", // []byte
//             Return: "$trace.MsgRct.Return",
//             ParamsDetail: "$message.Detail.Params",
//             ReturnDetail: "$trace.Detail.Return",
//             Version: "$message.Version",
//             Nonce: "$message.Nonce",
//             GasLimit: "$message.GasLimit",
//             GasFeeCap: "$message.GasFeeCap",
//             GasPremium: "$message.GasPremium",
//             GasCost: "$trace.GasCost",
//         }
//     }
// ]


// BlockMessage
    [
    {
        $match: {
            _id: ctx.Cid,
            // Epoch: ctx.StartEpoch
        }
    },
        {
            $lookup: {
                from: "ExecTrace",
                let: {cids: "$Messages", epoch: "$Epoch"},
                pipeline: [
                    {
                        $match:
                            {
                                $expr: {
                                    $and: [
                                        {$or: [
                                                {$in: ["$Cid", "$$cids"]},
                                                {$in: ["$SignedCid", "$$cids"]}
                                            ]},
                                        {$eq:["$Epoch", "$$epoch"]},
                                    ]
                                }
                            }
                    }
                ],
                as: "trace"
            }
        },
        {
            $unwind: "$trace"
        },
        //todo: SignedCid始终为替换前的cid, 如果SignedCid为空null，说明该条消息未被替换；block中替换前的消息不应该有epoch和返回值
        {
            $addFields: {
                Cid: {
                    $cond: {
                        if: {
                            $eq: ["$trace.SignedCid", null]
                        }, then: "$trace.Cid",
                        else: "$trace.SignedCid"
                    }
                },
            }
        },
        {
            $sort: {
                Cid: 1
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
                let: {cid: "$Cid"},
                pipeline: [
                    {
                        $match:
                            {
                                $expr: {
                                    $and: [
                                        {$or: [
                                                {$eq: ["$_id", "$$cid"]},
                                                {$eq: ["$SignedCid", "$$cid"]}
                                            ]},
                                    ]
                                }
                            }
                    }
                ],
                as: "message"
            }
        },
        {
            $unwind: "$message"
        },
        {
            $project: {
                Cid: "$Cid",
                Epoch: "$Epoch",
                Value: "$message.Value",
                From: "$message.From",
                To: "$message.To",
                ExitCode: "$trace.MsgRct.ExitCode",
                Method: "$message.Detail.Method",
                Params: "$message.Params", // []byte
                Return: "$trace.MsgRct.Return",
                ParamsDetail: "$message.Detail.Params",
                ReturnDetail: "$trace.Detail.Return",
                Version: "$message.Version",
                Nonce: "$message.Nonce",
                GasLimit: "$message.GasLimit",
                GasFeeCap: "$message.GasFeeCap",
                GasPremium: "$message.GasPremium",
                GasCost: "$trace.GasCost",
            }
        }
    ]
