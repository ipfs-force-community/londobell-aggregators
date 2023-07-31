// ChangedSector
// 最新库的所有live sector都算上
[
    {
        $match: {
            Miner: ctx.Addr,
            Removed: false,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            Epoch: -1
        }
    },
    {
        $group: {
            _id: "$SectorNumber",
            doc: {$first: "$$ROOT"}
        }
    },
    {
        $replaceRoot: {
            newRoot: "$doc" // 替换根文档为之前获取的唯一文档
        }
    },
    {
        $group: {
            _id: 0,
            VDCPower: {
                $sum: {
                    $divide: [
                        {$multiply: [{$toDecimal: "$VerifiedDealWeight"}, 10]},
                        {$subtract: ["$Expiration", "$Activation"]}
                    ]
                }
            },
            DCPower: {
                $sum: {
                    $divide: [
                        {$toDecimal: "$DealWeight"},
                        {$subtract: ["$Expiration", "$Activation"]}
                    ]
                }
            },
            CCPower: {
                $sum: {
                    $divide: [
                        {$subtract: [{$subtract: [{$multiply: [{$subtract: ["$Expiration", "$Activation"]}, ctx.SectorSize]}, {$toDecimal: "$VerifiedDealWeight"}]}, {$toDecimal: "$DealWeight"}]},
                        {$subtract: ["$Expiration", "$Activation"]}
                    ]
                }
            },
        }
    },
]