// ExecTrace
[
    {
        $match: {
            IsBlock: true,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}
        }
    },
    {
        $sort: {
            "Epoch": ctx.Sort,
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "message",
        },
    },
    {
        $unwind: "$message"
    },
    {
        $group: {
            _id: "$Epoch",
            TotalGasLimit: {$sum: "$GasLimit"},
            TotalGasFeeCap: {$sum: {$toDecimal: "$GasFeeCap"}},
            TotalGasPremium: {$sum: {$toDecimal: "$GasPremium"}},
            TotalGasUsed: {$sum: "$GasUsed"},
            TotalBaseFeeBurn: {$sum: {$toDecimal: "$BaseFeeBurn"}},
            TotalOverEstimationBurn: {$sum: {$toDecimal: "$OverEstimationBurn"}},
            TotalMinerPenalty: {$sum: {$toDecimal: "$MinerPenalty"}},
            TotalMinerTip: {$sum: {$toDecimal: "$MinerTip"}},
            MessageCount: {$sum: 1}
        }
    },
    {
        $addFields: {
            AverageGasLimit: {$divide: ["$TotalGasLimit", "$MessageCount"]},
            AverageGasFeeCap: {$divide: ["$TotalGasFeeCap", "$MessageCount"]},
            AverageGasPremium: {$divide: ["$TotalGasPremium", "$MessageCount"]},
            AverageGasUsed: {$divide: ["$TotalGasUsed", "$MessageCount"]},
            AverageBaseFeeBurn: {$divide: ["$TotalBaseFeeBurn", "$MessageCount"]},
            AverageOverEstimationBurn: {$divide: ["$TotalOverEstimationBurn", "$MessageCount"]},
            AverageMinerPenalty: {$divide: ["$TotalMinerPenalty", "$MessageCount"]},
            AverageMinerTip: {$divide: ["$TotalMinerTip", "$MessageCount"]},
        }
    }
]