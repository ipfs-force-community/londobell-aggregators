// MinerSectorHealth
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr,
        }
    },
    {
        $project: {
            AllSectors: "$Detail.All",
            LiveSectors: "$Detail.Live",
            LiveQAPower: {$add: [{$toDecimal: "$Detail.ActiveSectorsQAPower"}, {$toDecimal: "$Detail.FaultsQAPower"}, {$toDecimal: "$Detail.UnprovenQAPower"}]},
            LiveRawPower: {$add: [{$toDecimal: "$Detail.ActiveSectorsRawPower"}, {$toDecimal: "$Detail.FaultsRawPower"}, {$toDecimal: "$Detail.UnprovenRawPower"}]},
            FaultSectors: "$Detail.Faults",
            FaultQAPower: {$toDecimal: "$Detail.FaultsQAPower"},
            FaultRawPower: {$toDecimal: "$Detail.FaultsRawPower"},
        }
    }
]
