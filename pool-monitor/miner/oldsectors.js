// MinerSector
[
    {
        $match: {
            Miner: ctx.Addr,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}, // 库高度范围
            SectorNumber: {$lt: ctx.Start} // 表sector范围,实时查
        }
    },
    {
        $group:{
            _id: 0,
            SectorNumbers: {$addToSet: "$SectorNumber"}
        }
    }
]