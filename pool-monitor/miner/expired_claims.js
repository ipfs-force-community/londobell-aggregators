// SectorClaim
// 取每张表所有新增的当前高度已过期的claims
// 一直用下张表替换上张表的claim，上张表已过期可能下张表续期了（实际还没过期）；已过期的要进一步查是否被removed
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Provider", ctx.Addr]},
                    {$eq: ["$TermStart", "$Epoch"]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$gte: [{$add: ["$TermStart", "$TermMax"]}, ctx.CurEpoch]}]
            }
        }
    },
    {
        $project: {
            Miner: "$Provider",
            Client: "$Client",
            Sector: "$Sector",
            ClaimID: "$_id",
            Size: "$Size",
            Data: "$Data",
            TermStart: "$TermStart",
            TermMin: "$TermMin",
            TermMax: "$TermMax",
        }
    }
]