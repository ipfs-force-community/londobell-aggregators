// SectorClaim
// 取每张表所有新增的未过期的claims
// 一直用下张表替换上张表的claim，上张表即将过期可能下张表续期了
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Provider", ctx.Addr]},
                    {$eq: ["$TermStart", "$Epoch"]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$gte: [{$add: ["$TermStart", "$TermMax"]}, ctx.ExpirationStartEpoch]},
                    {$lt: [{$add: ["$TermStart", "$TermMax"]}, ctx.ExpirationEndEpoch]}
                ]
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