[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            "Depth": 1,
            "SubCallCount": 1,
            "Detail.Return.Applied": true,
            "Detail.Return.Code": 0
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
                                    {$regexMatch: { input: "$Detail.Actor", regex: "multisig" }},
                                    // {$eq: [{$substrBytes: ["$Detail.Actor", 6, {$add: [{$strLenBytes: "$Detail.Actor"}, -1]}]}, "multisig"]},
                                ]
                            }
                        }
                }
            ],
            as: "Message"
        }
    },
    {
        $unwind: "$Message"
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                seq: "$Seq",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: [{$slice: ["$Seq", {$add: [{$size: "$Seq"}, -1]}]}, "$$seq"]},
                                    {$eq: ["$Epoch", "$$epoch"]},
                                    {$eq: ["$Depth", 2]}
                                ]
                            }
                        }
                }
            ],
            as: "ChildTrace"
        }
    },
    {
        $unwind: "$ChildTrace"
    },
    {
        $lookup: {
            from: "Message",
            let: {
                cid: "$ChildTrace.Cid"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$_id", "$$cid"]}
                            ]
                        }
                    }
                }
            ],
            as: "ChildMessage"
        }
    },
    {
        $unwind: "$ChildMessage"
    },
]
