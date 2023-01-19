// ExecTrace
// Sort by method name
// todo: 分库查询
[
    {
        $match: {
            Cid: ctx.Cid,
            Depth: 1 // not inclued cron, which may contained burn pledge
        }
    },
    {
        $lookup: {
            from: "ExecTrace",
            let: {
                id: "$_id",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Epoch", "$$epoch"]},
                                {$ne: ["$_id", "$$id"]},
                                {$ne: [{$indexOfBytes: ["$_id", "$$id"]}, -1]},
                            ]
                        }
                    }
                }
            ],
            as: "trace",
        }
    },
    {
        $unwind: "$trace"
    },
    {
        $lookup: {
            from: "Message",
            let: {cid: "$trace.Cid"},
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
            as: "message"
        }
    },
    {
        $unwind: "$message"
    }
]