// collection: MinerSectorHealth
// notice: should find epoch interval which MinerSectorHealth and MinerFunds both has
// TerminatedSectors will be removed only by calling `CompactPartitions`
[
    {
        $match: {
            "Epoch": {$in: [ctx.StartEpoch, ctx.EndEpoch]}
        }
    },
    {
        $lookup: {
            from: "MinerFunds",
            let: {
                addr: "$Addr",
                epoch: "$Epoch"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$eq: ["$Addr", "$$addr"]},
                                {$eq: ["$Epoch", "$$epoch"]}
                            ],
                        },
                    },
                },
            ],
            as: "minerfunds",
        },
    },
    {
        $unwind: "$minerfunds"
    },
    {
        $group: {
            _id: "$Epoch",
            totalTerminatedSectorsSize: {
                $sum: {
                    $multiply: ["$Detail.TerminatedSectors", "$minerfunds.Info.SectorSize"],
                },
            },
        }
    },
    {
        $sort: {
            "_id": 1
        }
    },
    {
        $group: {
            _id:0,
            from: {
                $first: "$$ROOT",
            },
            to: {
                $last: "$$ROOT",
            }
        }
    },
    {
        $addFields: {
            increasedTerminatedSectorsSize:{$subtract: ["$to.totalTerminatedSectorsSize", "$from.totalTerminatedSectorsSize"]}}
    }
]
