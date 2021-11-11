// 0.121s
var startEpoch = 1087500
var endEpoch = 1087557
var minerAddr = '022373'
var methodname = "ApplyRewards"

db.ExecTrace.aggregate([
    { $match: { 'Epoch': { $gt: startEpoch, $lte: endEpoch } } },
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
                                        { $eq: ["$To", minerAddr] },
                                        { $eq: ["$Detail.Method", methodname]}
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
    {$project:{totalBlockReward:{$sum:{$toDecimal:"$blockrewardMatches.Value"}}, blockcount:{$sum:1}, _id:0}}
])









// 0.048s
var minerAddr = "022373"
var startEpoch = 1087500
var endEpoch = 1087557
var methodname = "AwardBlockReward"

db.ExecTrace.aggregate([
    {$match:{"Epoch": {$gt: startEpoch, $lte: endEpoch}, "Depth": 1}},
    {$lookup:{
            'from':"Message",
            'let':{cid:"$Cid"},
            'pipeline':[
                {$match:{
                        $expr:{
                            $and:[
                                {$eq:["$$cid", "$_id"]},
                                {$eq: ["$Detail.Params.Miner",minerAddr]},
                                {$eq:["$Detail.Method",methodname]}
                            ]
                        }
                    }}
            ],
            'as':"wincountMatches"
        }
    },
    {$unwind:"$wincountMatches"},
    {$project:{totalWincount:{$sum:"$wincountMatches.Detail.Params.WinCount"}, "_id" :0}}
])
