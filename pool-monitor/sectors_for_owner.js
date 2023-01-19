// MinerFunds
[
    {
        $match: {
            "Info.Owner": ctx.Addr,
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch
            }
        }
    },
    {
        $group: {
            _id: "$Info.Owner",
            Addrs: {$addToSet: "$Addr"}
        }
    },
    {
        $lookup: {
            from: "MinerSectorHealth",
            let: {addrs: "$Addrs"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {$in: ["$Addr", "$$addrs"]},
                            ]
                        }
                    }
                }
            ],
            as: "minerSectorHealth",
        }
    },
    {
        $unwind: "$minerSectorHealth"
    },
    {
        $sort: {
            "minerSectorHealth.Epoch": -1
        }
    },
    {
        $group: {
            _id: "$minerSectorHealth.Addr",
            sectors: {
                $first: "$$ROOT"
            }
        }
    },
    {
        $group: {
            _id: "$sectors._id",
            all: {$sum: "$sectors.minerSectorHealth.Detail.All"},
            live: {$sum: "$sectors.minerSectorHealth.Detail.Live"},
            faults: {$sum: "$sectors.minerSectorHealth.Detail.Faults"},
            recoveries: {$sum: "$sectors.minerSectorHealth.Detail.Recoveries"},
        }
    }
]
