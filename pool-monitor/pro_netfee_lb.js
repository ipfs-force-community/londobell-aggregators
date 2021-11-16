// 11.59s
var startEpoch = 1246320;
var endEpoch = 1249200;
var res = db.ExecTrace.aggregate(
    [
        {
            $match: {
                Epoch: {
                    $gt: startEpoch,
                    $lte: endEpoch,

                },
                "Msg.To": "099",
                "Msg.Method": 0,
                "Depth": 2
            }
        },
        {
            $project: {
                Seq: 1,
                Cid: 1,
                Epoch: 1
            }
        },
        {
            $lookup: {
                from: "ExecTrace",
                let: {
                    epoch: "$Epoch",
                    seq: "$Seq"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$Epoch", "$$epoch"]
                                    },
                                    {
                                        $eq: ["$Depth", 1]
                                    },
                                    {
                                        $eq: [{
                                            $first: "$Seq"
                                        }, {
                                            $first: "$$seq"
                                        }]
                                    },
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            Cid: 1
                        }
                    }
                ],
                as: "Parent"
            }
        },
        {
            $unwind: "$Parent"
        },
        {
            $lookup: {
                from: "Message",
                let: {
                    mcid: "$Parent.Cid"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$_id", "$$mcid"]
                                    },
                                    {
                                        $eq: ["$Detail.Method", "ProveCommitAggregate"]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            "Detail.Method": 1,
                            "Detail.Actor": 1
                        }
                    }
                ],
                as: "ParentRaw"
            }
        },
        {
            $unwind: "$ParentRaw"
        },
        {
            $lookup: {
                from: "Message",
                localField: "Cid",
                foreignField: "_id",
                as: "SelfRaw"
            }
        },
        {
            $unwind: "$SelfRaw"
        },
        {
            $group: {
                _id: "$SelfRaw.From",
                MsgCount: {
                    $sum: 1
                },
                BurntFee: {
                    $sum: {
                        $divide: [{
                            $toDecimal: "$SelfRaw.Value"
                        }, 1e18]
                    }
                }
            }
        }
    ]
);

res.forEach(printjson);
