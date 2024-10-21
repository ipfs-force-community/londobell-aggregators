// MinerSector
// 只返回最新的sectors, 一直用下张表替换上张表的sector
[
    {
        $match: {
            Miner: ctx.Addr,
            Terminated: false,
            // Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}, // 库范围，自己填
            Expiration: {$gte: ctx.CurEpoch}, // CurEpoch: 历史高度
            SectorNumber: {$gte: ctx.Start, $lt: ctx.End},
        }
    },
    {
        $sort: {
            "SectorNumber": ctx.Sort
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            Miner: "$Miner",
            SectorNumber: "$SectorNumber",
            Activation: "$Activation",
            Expiration: "$Expiration",
            InitialPledge: "$InitialPledge",
            DealWeight: "$DealWeight",
            VerifiedDealWeight: "$VerifiedDealWeight",
            DealIDs: "$DealIDs",
            SimpleQaPower: "$SimpleQaPower"
        }
    }
]