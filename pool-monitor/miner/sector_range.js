// todo: MinerNewSectorNumber  _id, Miner, SectorNumber, Epoch
//// 防止replace 第一个Activation==Epoch 且 end-start == start到end的个数（连续）
[
    {
        $match: {
            Miner: ctx.Addr,
            Epoch: {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch},
        }
    },
    {
        $sort: {
            SectorNumber: 1
        }
    },
    {
        $group: {
            _id: 0,
            start: {
                $first: "$$ROOT.SectorNumber",
            },
            end: {
                $last: "$$ROOT.SectorNumber",
            }
        }
    },
    {
        $addFields: {
            end: {$add: ["$end", 1]}
        }
    }
]