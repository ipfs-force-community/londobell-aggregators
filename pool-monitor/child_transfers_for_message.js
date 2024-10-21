// ExecTrace
// Sort by method name
// todo: 分库查询
// todo: db.ExecTrace.createIndex({"Epoch":1,"SubCallCount":1}, {"sparse": true});
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {"SubCallCount": {$gt: 0}},
                {$or: [{"Cid": ctx.Cid}, {"SignedCid": ctx.Cid}]},
            ]

            // $expr: {
            //     $and: [
            //         {$eq: ["$Depth", 1]}, // not inclued cron, which may contained burn pledge
            //         {$or: [
            //             {$eq: ["$Cid", ctx.Cid]},
            //             {$eq: ["$SignedCid", ctx.Cid]}
            //         ]},
            //         {$gt: ["$SubCallCount", 0]},
            //     ]
            // }
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
                }
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
            let: {cid: "$childTrace.Cid"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$cid"]},
                                {$gt: [{$toDecimal: "$Value"}, 0]}
                            ]
                        }
                    }
                }
            ],
            as: "childMessage"
        }
    },
    {
        $unwind: "$childMessage"
    },
    {
        $group: {
            _id: "$Epoch",
            TransferList: {$addToSet: "$childMessage"},
            rawMessage: {$addToSet: "$message"},
            GasCost: {$addToSet: "$GasCost"},
            rawMsgRct: {$addToSet: "$MsgRct"},
            rawDetail: { $addToSet: "$Detail" },
            Error: {$first: "$Error"}
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
            ParamsBson: "$rawMessage.Params",
            ReturnsBson: "$rawMsgRct.Return",
            MethodNum: "$rawMessage.Method",
            Actor: "$rawMessage.Detail.Actor"
        }
    }
]
