// MinerSectorHealth
// todo: 删除了终止扇区，会导致净增变少  epoch范围左闭右闭？
// 注意：分库会有问题
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            Addr: ctx.Addr,
        }
    },
    {
        $sort: {
            "Epoch": -1
        }
    },
    {
        $group: {
            _id: 0,
            start: {
                $first: "$$ROOT",
            },
            end: {
                $last: "$$ROOT",
            }
        }
    },
    {
        $addFields:{
            AllSectorsDiff: {$subtract: ["$end.Detail.All", "$start.Detail.All"]},
            LiveSectorsDiff: {$subtract: ["$end.Detail.Live", "$start.Detail.Live"]},
            LiveQAPowerDiff: {$subtract: [{$add: [{$toDecimal: "$end.Detail.ActiveSectorsQAPower"}, {$toDecimal: "$end.Detail.FaultsQAPower"}, {$toDecimal: "$end.Detail.UnprovenQAPower"}]}, {$add: [{$toDecimal: "$start.Detail.ActiveSectorsQAPower"}, {$toDecimal: "$start.Detail.FaultsQAPower"}, {$toDecimal: "$start.Detail.UnprovenQAPower"}]}]},
            LiveRawPowerDiff: {$subtract: [{$add: [{$toDecimal: "$end.Detail.ActiveSectorsRawPower"}, {$toDecimal: "$end.Detail.FaultsRawPower"}, {$toDecimal: "$end.Detail.UnprovenRawPower"}]}, {$add: [{$toDecimal: "$start.Detail.ActiveSectorsRawPower"}, {$toDecimal: "$start.Detail.FaultsRawPower"}, {$toDecimal: "$start.Detail.UnprovenRawPower"}]}]},
            FaultSectorsDiff: {$subtract: ["$end.Detail.Faults", "$start.Detail.Faults"]},
            FaultQAPowerDiff: {$subtract: ["$end.Detail.FaultsQAPower", "$start.Detail.FaultsQAPower"]},
            FaultRawPowerDiff: {$subtract: ["$end.Detail.FaultsRawPower", "$start.Detail.FaultsRawPower"]},
        }
    }
]
