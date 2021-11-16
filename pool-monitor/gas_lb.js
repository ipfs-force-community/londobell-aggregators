// 10.18s
var startEpoch = 1246320;
var endEpoch = 1249200;
var res = db.ExecTrace.aggregate([
    {
        $match: {
            "Depth": 1,
            "Epoch": {
                $gt: startEpoch,
                $lte: endEpoch
            },
            "Msg.To": /^0/
        }
    },
    {
        $group: {
            _id: {
                "to": "$Msg.To",
                "exit_code": "$MsgRct.ExitCode"
            },
            gasSum: {
                $sum: {
                    $toDouble: "$GasCost.TotalCost"
                }
            },
            MsgCount: {
                $sum: 1
            }
        }
    }
]);

res.forEach(printjson);