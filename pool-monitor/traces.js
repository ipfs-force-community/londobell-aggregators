// ExecTrace
// todo: 多条trace可能对应一条message(cid)，这种情况得到的trace会变多。不会
[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
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
                                    {$eq: ["$_id", "$$cid"]}
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
            ID: "$_id",
            Cid: "$Cid",
            SignedCid: "$SignedCid",
            Epoch: "$Epoch",
            Seq: "$Seq",
            Depth: "$Depth",
            Ver: "$Ver",
            Msg: "$Msg",
            MsgRct: "$MsgRct",
            Error: "$Error",
            SeqIndex: "$SeqIndex",
            SubCallCount: "$SubCallCount",
            GasCost: "$GasCost",
            ReturnBson: "$MsgRct.Return",
            Version: "$message.Version",
            To: "$message.To",
            From: "$message.From",
            Nonce: "$message.Nonce",
            Value: "$message.Value",
            GasLimit: "$message.GasLimit",
            GasFeeCap: "$message.GasFeeCap",
            GasPremium: "$message.GasPremium",
            Method: "$message.Method",
            ParamsBson: "$message.Params",
            Detail: "$message.Detail",
            Actor: "$message.Detail.Actor"
        }
    }
]
