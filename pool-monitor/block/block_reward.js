// BlockHeader
[
    {
        $match: {
            "_id": ctx.Cid
        }
    },
    {
        $lookup: {
            from: "ActorMessage",
            let: {
                miner: "$Miner",
                epoch: "$Epoch",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$IsBlock", false]},
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$eq: ["$From", "02"]},
                                {$eq: ["$To", "$$miner"]},
                                {$eq: ["$MethodName", "ApplyRewards"]}

                            ]
                        }
                    }
                },
            ],
            as: "message",
        }
    },
    {
        $unwind: "$message"
    },
    {
        $project: {
            Miner: "$Miner",
            BlockReward: "$Value"
        }
    }
]