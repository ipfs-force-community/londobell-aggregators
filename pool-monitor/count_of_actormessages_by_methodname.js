// ExecTrace
// db.ExecTrace.createIndex({"Epoch":1,"Depth":1,"Msg.From":1}, {"sparse": true});
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]}
            ]
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
                        Method: "$Detail.Method",
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
