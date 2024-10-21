// SectorClaim
[
    {
        $match: {
            _id: ctx.ID,
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