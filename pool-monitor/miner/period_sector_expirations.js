// ChangedSector
// 取formal库所有未过期的sectors
[
    {
        $match: {
            Miner: ctx.Addr,
            Removed: false,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
            // Expiration: {$gte: ctx.ExpirationStartEpoch, $lt: ctx.ExpirationEndEpoch}
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
        $sort: {
            "doc.Expiration": -1
        }
    },
    {
        $replaceRoot: {
            newRoot: "$doc" // 替换根文档为之前获取的唯一文档
        }
    }
]
