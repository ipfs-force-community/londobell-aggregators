// 3.158s
var startEpoch = 1090000
var endEpoch = 1097835
var minerAddr = '0519333'

db.ExecTrace.aggregate([
    { $match:
            {
                'Epoch': { $gt: startEpoch, $lte: endEpoch },
                'Depth': 2,
                'Msg.From': "02",
                'Msg.To': minerAddr,
                'Msg.Method': 14,
                'SubCallCount': 1
            }
    },
    { $lookup:
            {
                'from': "Message",
                'let': { cid: "$Cid" },
                'pipeline': [
                    { $match:
                            {
                                $expr: {
                                    $and: [
                                        { $eq: ["$$cid", "$_id"] },
                                    ]
                                }
                            }
                    }
                ],
                'as': "blockrewardMatches"
            }
    }	,
    {
        $unwind: "$blockrewardMatches"
    },
    {$group:{
        _id: "$Msg.To",
        totalBlockReward:{$sum:{$divide:[{$toDecimal:"$blockrewardMatches.Value"}, 1e18]}},
        blockcount:{$sum:1}
    }}
])








//2.198s
var minerAddr = "0764901"
var startEpoch = 1087000
var endEpoch = 1088000

db.ExecTrace.aggregate([
    {$match:
            {
                "Epoch": {$gt: startEpoch, $lte: endEpoch},
                "Depth": 1,
                "Msg.From": "00",
                "Msg.To": "02",
                "Msg.Method": 2
            }
    },
    {$lookup:{
            'from':"Message",
            'let':{cid:"$Cid"},
            'pipeline':[
                {$match:{
                        $expr:{
                            $and:[
                                {$eq:["$$cid", "$_id"]},
                                {$eq: ["$Detail.Params.Miner",minerAddr]}
                            ]
                        }
                    }}
            ],
            'as':"wincountMatches"
        }
    },
    {$unwind:"$wincountMatches"},
    {
        $group: {
            _id: "$wincountMatches.Detail.Params.Miner",
            totalWincount: {$sum: "$wincountMatches.Detail.Params.WinCount"}
        }
    }
])
