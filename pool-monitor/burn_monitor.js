// aggregate not included
[
    {
        $match: {
            "Msg.To": "099",
            "Msg.Method": 0,
            "Msg.From": {$in: ctx.Addrs},
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {epoch: "$Epoch", depth: "$Depth", seq: "$Seq"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$Epoch", "$$epoch"]},
                                    {$eq: ["$Depth", {$add: ["$$depth", -1]}]},
                                    {$eq: ["$Seq", {$slice: ["$$seq", {$add: [{$size: "$$seq"}, -1]}]}]},
                                ]
                            }
                        }
                }
            ],
            as: "parentTrace",
        }
    },
    {
        $unwind: "$parentTrace"
    },
    {
        $lookup: {
            from: "Message",
            let: {cid: "$parentTrace.Cid"},
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$_id", "$$cid"]},
                                    {$not:{$in: ["$Method", [25, 26, 28]]}},
                                ]
                            }
                        }
                }
            ],
            as: "parentMessage",
        }
    },
    {
        $unwind: "$parentMessage"
    },
    {
        $project: {
            _id: 0,
            From: "$message.From",
            Value: "$message.Value",
            Type: "burn"
        }
    }
]