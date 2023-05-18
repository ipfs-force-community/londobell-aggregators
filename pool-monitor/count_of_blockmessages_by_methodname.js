// ExecTrace 90个高度2秒
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
            Cid: 1,
            Epoch: 1,
            "Msg.From":1,
            "Msg.To":1
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
            let: {cid: "$Cid", epoch: "$Epoch", from: "$Msg.From", to: "$Msg.To"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: [ "$_id", "$$cid"]},
                                    {$eq: [ "$Detail.PackedHeight", "$$epoch"]},
                                    {$eq: [ "$From", "$$from"]},
                                    {$eq: [ "$To", "$$to"]},
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
    {
        $group: {
            _id: "$message.Detail.Method",
            count: {$sum: 1}
        }
    }
]
