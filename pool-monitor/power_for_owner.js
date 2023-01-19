// MinerFunds
// todo: 有效算力图表算的是什么？
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
            from: "ClaimedPower",
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
            as: "claimedpower",
        }
    },
    {
        $unwind: "$claimedpower"
    },
    {
        $sort: {
            "claimedpower.Epoch": -1
        }
    },
    {
        $group: {
            _id: "$claimedpower.Addr",
            power: {
                $first: "$$ROOT"
            }
        }
    },
    {
        $group: {
            _id: "$power._id",
            rawBytePower: {$sum: {$toDecimal: "$power.claimedpower.Detail.RawBytePower"}},
            qualityPower: {$sum: {$toDecimal: "$power.claimedpower.Detail.QualityAdjPower"}},
        }
    }
]
