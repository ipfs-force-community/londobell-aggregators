[
    {
        $match: {
            "_id": ctx.StartEpoch
        }
    },
    {
        $lookup: {
            from: "Tipset",
            let: {
                epoch: "$ChildEpoch"
            },
            pipeline: [
                {
                    $match:
                        {
                            $expr: {
                                $and: [
                                    {$eq: ["$$epoch", "$_id"]}
                                ]
                            }
                        }
                }
            ],
            as: "child"
        }
    },
    {
        $unwind: "$child"
    },
    {
        $project: {
            CurrentTipset: "$Cids",
            ChildEpoch: "$ChildEpoch",
            ChildTipset: "$child.Cids"
        }
    }
]
