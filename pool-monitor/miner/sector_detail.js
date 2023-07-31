// MinerSector
// todo: 直接请求api
[
    {
        $match: {
            Miner: ctx.Addr,
            SectorNumber: ctx.SectorNumber,
        }
    },
    {
        $project: {
            Epoch: "$Epoch",
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