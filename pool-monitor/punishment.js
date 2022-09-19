[
    {
        $match: {
            "Msg.To": "099",
            "Msg.Method": 0,
            "SubCallCount": 0,
            "Detail.Return": null,
            "GasCost": null,
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch
            }
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                epoch: "$Epoch",
                seq: "$Seq",
                depth: "$Depth"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$eq: ["$Seq", {$slice: ["$$seq", {$add: [{$size: "$$seq"}, -1]}]}]},
                                {$eq: ["$Depth", {$add: ["$$depth", -1]}]}
                            ]
                        }
                    }
                }
            ],
            as: "trace",
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $lookup: {
            from: "Message",
            let: {
                id: "$trace.Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$id"]},
                                {$or: [
                                        {$eq: ["$Detail.Method", "TerminateSectors"]},
                                        {$eq: ["$Detail.Method", "OnDeferredCronEvent"]},
                                        {$eq: ["$Detail.Method", "ApplyRewards"]},
                                        {$eq: ["$Detail.Method", "DeclareFaultsRecovered"]}
                                    ]
                                }
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
        $lookup: {
            from: "Message",
            let: {
                id: "$Cid",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$id"]}
                            ]
                        }
                    }
                }
            ],
            as: "burnMessage"
        }
    },
    {
        $unwind: "$burnMessage"
    },
    {
        $project: {
            _id: 0,
            miner: "$burnMessage.From",
            epoch: "$Epoch",
            block_time: {
                $toDate: {$add: [{$toDecimal: {
                            $dateFromString: {
                                dateString: "2020-08-25T06:00:00", //格式："2020-08-25T06:00:00"
                                timezone: "Asia/Shanghai"
                            }
                        }}, {$multiply: ["$Epoch", 30*1000]}]}
            },
            value: "$burnMessage.Value",
            penalty_type: {
                $cond:{
                    if:{
                        $eq:["$message.Detail.Method", "ApplyRewards"]
                    },then: "block",
                    else: "sector"
                }
            },
            source: "londobell"
        }
    }
]
