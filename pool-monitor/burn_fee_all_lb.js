// 5.36s
var startEpoch = 1246320;
var endEpoch = 1250000;
var res = db.ExecTrace.aggregate([
    {
        $match: {
            Epoch: {
                $gt: startEpoch,
                $lte: endEpoch,

            },
            "Msg.To": "099",
            "Msg.Method": 0,
        }
    },
    {
        $project: {
            Cid: 1,
        }
    },
    {
        $lookup: {
            from: "Message",
            localField: "Cid",
            foreignField: "_id",
            as: "SelfRaw",

        }
    },
    {
        $unwind: "$SelfRaw",
    },
    {
        $group: {
            _id: "$SelfRaw.From",
            BurntFee: {
                $sum: {
                    $toDecimal: "$SelfRaw.Value"
                }
            }
        }
    }
]);

res.forEach(printjson);


