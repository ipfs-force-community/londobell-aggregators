// // ExplicitMessage
// // todo: skip或limit变大 变慢
// [
//     {
//         $match: {
//             "MethodName": ctx.MethodName,
//             "Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
//         }
//     },
//     {
//         $sort: {
//             Epoch: -1
//         }
//     },
//     {
//         $skip: ctx.Skip
//     },
//     {
//         $limit: ctx.Limit
//     },
//     {
//         $project: {
//             _id: 0,
//             SignedCid: "$_id",
//             Epoch: "$Epoch",
//             From: "$From",
//             To: "$To",
//             Value: "$Value",
//             ExitCode: "$ExitCode",
//             Method: "$MethodName"
//         }
//     }
// ]

// ExecTrace
// todo: skip或limit变大 变慢
[
    {
        $match: {
            "IsBlock": true,
            "Msg.MethodName": ctx.MethodName,
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
            SignedCid: {
                $cond: {
                    if:{
                        $eq:["$SignedCid", null]
                    }, then: "$Cid",
                    else: "$SignedCid"
                }
            },
            RootCid: {
                $cond: {
                    if: {
                        $eq: ["$RootSignedCid", null]
                    }, then: "$RootCid",
                    else: "$RootSignedCid"
                }
            },            
            Epoch: "$Epoch",
            From: "$Msg.From",
            To: "$Msg.To",
            Value: "$Msg.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$Msg.MethodName"
        }
    }
]
