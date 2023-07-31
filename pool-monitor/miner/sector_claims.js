// SectorClaim
// 指定miner和sector的所有（包括过期）Claims
// 过期的也可以续期，要看是否被remove
// 得到当前最新的记录
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Provider", ctx.Addr]},
                    {$eq: ["$Sector", ctx.SectorNumber]},
                    {$eq: ["$Epoch", "$TermStart"]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]}
                ]
            }
        }
    },
    {
        $sort: {
            "_id": ctx.Sort
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
            Epoch: "$Epoch", // 上个库要被下个库更新
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