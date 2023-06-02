// ExecTrace
// Sort by method name
// todo: 分库查询
// todo: db.ExecTrace.createIndex({"Epoch":1,"SubCallCount":1}, {"sparse": true});
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
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        },
    },
    {
        $unwind: "$message"
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
                {
                    $project: {
                        _id: 0,
                        To: "$Msg.To",
                        From: "$Msg.From",
                        Value: "$Msg.Value",
                        MethodName: "$Msg.MethodName",
                    }
                }
            ],
            as: "childTrace",
        }
    },
    {
        $unwind: "$childTrace"
    },
    {
        $group: {
            _id: "$Epoch",
            InnerCalls: {$addToSet: "$childTrace"},
            rawMessage: {$addToSet: "$message"},
            GasCost: {$addToSet: "$GasCost"},
            rawMsgRct: {$addToSet: "$MsgRct"},
            rawDetail: {$addToSet: "$Detail"}
        }
    },
    {
        $unwind: "$rawMessage"
    },
    {
        $unwind: "$GasCost"
    },
    {
        $unwind: "$rawMsgRct"
    },
    {
        $unwind: "$rawDetail"
    },
    {
        $addFields: {
            Cid: {
                $cond: {
                    if:{
                        $eq:["$rawMessage.SignedCid", null]
                    }, then: "$rawMessage._id",
                    else: "$rawMessage.SignedCid"
                }
            },
            Value: "$rawMessage.Value",
            From: "$rawMessage.From",
            To: "$rawMessage.To",
            ExitCode: "$rawMsgRct.ExitCode",
            Method: "$rawMessage.Detail.Method",
            Params: "$rawMessage.Params", // []byte
            Return: "$rawMsgRct.Return",
            ParamsDetail: "$rawMessage.Detail.Params",
            ReturnDetail: "$rawDetail.Return",
            Version: "$rawMessage.Version",
            Nonce: "$rawMessage.Nonce",
            GasLimit: "$rawMessage.GasLimit",
            GasFeeCap: "$rawMessage.GasFeeCap",
            GasPremium: "$rawMessage.GasPremium",
        }
    }
]