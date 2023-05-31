// ExplicitMessage
// todo: skip或limit变大 变慢
[
    {
        $match: {
            "MethodName": ctx.MethodName,
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
            SignedCid: "$_id",
            Epoch: "$Epoch",
            From: "$From",
            To: "$To",
            Value: "$Value",
            ExitCode: "$ExitCode",
            Method: "$MethodName"
        }
    }
]
