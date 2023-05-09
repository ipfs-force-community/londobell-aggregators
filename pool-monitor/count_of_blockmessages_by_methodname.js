// ExecTrace 90个高度2秒
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
            Cid: "$Cid"
        }
    },
    // {
    //     $lookup: {
    //         from: "Message",
    //         localField: "Cid",
    //         foreignField: "_id",
    //         as: "message",
    //     }
    // },
    {
        $lookup:  {
            from: "Message",
            let: {cid: "$Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: [ "$_id", "$$cid"]},
                                ]
                            }
                        }
                },
                {
                    $project: {
                        _id: 0,
                        "Detail.Method": 1
                    }
                }
            ],
            as: "message"
        }
    },
    {
        $unwind: "$message"
    },
    // {
    //     $project: {
    //         _id: 0,
    //         method: "$message.Detail.Method"
    //     }
    // },
    {
        $group: {
            // _id: "$method",
            _id: "$message.Detail.Method",
            count: {$sum: 1}
        }
    }
]
