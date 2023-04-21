// ExecTrace
// db.ExecTrace.createIndex({"Epoch":1,"Depth":1,"Msg.From":1}, {"sparse": true});
[
    {
        $match: {
            $expr: {
                $and: [
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$eq: ["$Depth", 1]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    },
                ]
            }
        }
    },
    {
        $project: {
            _id: 0,
            Cid: 1
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
                                ]
                            }
                        }
                },
                {
                    $project: {
                        _id: 0,
                        Method: "Detail.Method",
                        From:1,
                        To:1
                    }
                }
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    // {
    //     $group: {
    //         _id: "$message.Method",
    //         all_froms: {$push: "$message.From"},
    //         all_tos: {$push: "$message.To"},
    //     }
    // },
    {
        $project: {
            Method: "$message.Method",
            From: "$message.From",
            To: "$message.To",
        }
    }
]
