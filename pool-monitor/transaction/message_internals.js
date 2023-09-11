// ExecTrace
[
    {
        $match: {
            $and: [
                {"IsBlock": true},
                {"SubCallCount": {$gt: 0}},
                {$or: [{"Cid": ctx.Cid}, {"SignedCid": ctx.Cid}]},
            ]
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                id: "$_id",
                epoch: "$Epoch",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$ne: ["$_id", "$$id"]},
                                {$eq: [{$indexOfBytes: ["$_id", "$$id"]}, 0]},
                            ]
                        }
                    }
                },
            ],
            as: "childTrace",
        }
    },
    {
        $unwind: "$childTrace"
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$childTrace.Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$$cid", "$_id"]},
                            ],
                        },
                    },
                },
            ],
            as: "childMessage",
        },
    },
    {
        $unwind: "$childMessage",
    },
    {
        $project: {
            _id: 0,
            Epoch: "$Epoch",
            Cid: "$childTrace.Cid",
            From: "$childMessage.From",
            To: "$childMessage.To",
            Nonce: "$childMessage.Nonce",
            Version: "$childMessage.Version",
            GasLimit: "$childMessage.GasLimit",
            GasFeeCap : "$childMessage.GasFeeCap",
            GasPremium : "$childMessage.GasPremium",
            Value: "$childMessage.Value",
            ExitCode: "$childMessage.ExitCode",
            MethodName: "$childMessage.MethodName",
            Method: "$childMessage.Method",
            GasCost: "$childTrace.GasCost",
            Params: "$childMessage.Params",
            Return: "$childTrace.MsgRct.Return",
            IsBlock     :"$childTrace.IsBlock",
            SubCallCount :"$childTrace.SubCallCount",
            Depth        :"$childTrace.Depth",
        }
    },
]