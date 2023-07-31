// MinerSectorHealth hourly
[
    {
        $match: {
            Addr: ctx.Addr,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort
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
            Epoch: "$Epoch",
            FaultSectors : "$Faults",
            RecoveriesSectors : "$Recoveries",
            UnprovenSectors : "$Unproven",
            ActiveSectors : "$Active",
            LiveSectors : "$Live",
            AllSectors : "$All",
            ActiveSectorsQAPower : "$ActiveSectorsQAPower",
            FaultsQAPower : "$FaultsQAPower",
            RecoveriesQAPower : "$RecoveriesQAPower",
            UnprovenQAPower : "$UnprovenQAPower",
            ActiveSectorsRawPower : "$ActiveSectorsRawPower",
            FaultsRawPower : "$FaultsRawPower",
            RecoveriesRawPower : "$RecoveriesRawPower",
            UnprovenRawPower : "$UnprovenRawPower",
            TerminatedSectors : "$TerminatedSectors"
        }
    }
]