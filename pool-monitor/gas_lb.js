var startEpoch = 1246320;
var endEpoch = 1249200;
var res = db.ExecTrace.aggregate([
    {
        $match: {
            "Depth": 1,
            "Epoch": {
                $gt: startEpoch,
                $lte: endEpoch
            }
        }
    },
    {
        $group: {
            _id: { "to": "$Msg.To", "exit_code": "$MsgRct.ExitCode" },
            success_gas_fee: {
                $sum: { $toDouble: { $cond: [{ $eq: ["$MsgRct.ExitCode", 0] }, "$GasCost.TotalCost", 0] } }
            },
            fail_gas_fee: {
                $sum: { $toDouble: { $cond: [{ $gt: ["$MsgRct.ExitCode", 0] }, "$GasCost.TotalCost", 0] } }
            },
            success_gas_count: {
                $sum: { $toDouble: { $cond: [{ $eq: ["$MsgRct.ExitCode", 0] }, 1, 0] } }
            },
            fail_gas_count: {
                $sum: { $toDouble: { $cond: [{ $gt: ["$MsgRct.ExitCode", 0] }, 1, 0] } }
            },
            success_gas_penalty: {
                $sum: { $toDouble: { $cond: [{ $eq: ["$MsgRct.ExitCode", 0] }, "$GasCost.MinerPenalty", 0] } }
            },
            fail_gas_penalty: {
                $sum: { $toDouble: { $cond: [{ $gt: ["$MsgRct.ExitCode", 0] }, "$GasCost.MinerPenalty", 0] } }
            }
        }
    }
]);

res.forEach(printjson);