[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            }
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
                                    {$eq: ["$_id", "$$cid"]}
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
    }
]
