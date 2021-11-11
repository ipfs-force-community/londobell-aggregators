var startEpoch = 1269360;
var endEpoch = 1274478;
//var startEpoch = 1274188;
//var endEpoch = 1274388;
var miner = new Array("049911")
var res = db.ExecTrace.aggregate([
    {
        $match: {
            Epoch: {
                $gt: startEpoch,
                $lte: endEpoch,

            },
            "MsgRct.ExitCode": 0,
            "Depth": 1,
            "Msg.To": {
                $in: miner
            }
        }
    },
    {
        $project: {
            Cid: 1,
            Msg: 1,

        }
    },
    {
        $lookup: {
            from: "Message",
            let: {
                mcid: "$Cid",

            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ["$_id", "$$mcid"]
                                },
                                {
                                    $eq: ["$Detail.Method", "PreCommitSectorBatch"]
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        Detail: 1,
                        To: 1,

                    }
                }
            ],
            as: "ParentRaw",

        }
    },
    {
        $match: {
            "ParentRaw": {
                $exists: true,
                $not: {
                    $size: 0
                }
            }
        }
    },
    {
        $unwind: "$ParentRaw",

    },
    {
        $group: {
            _id: "$ParentRaw.To",
            sectorsSum: {
                $sum: {
                    $size: "$ParentRaw.Detail.Params.Sectors"
                }
            }
        }
    },
    {
        $addFields: {
            preAggGasFee: {
                $multiply: ["$sectorsSum", 4.108331e15]
            }
        }
    }
]);
res.forEach(printjson);


