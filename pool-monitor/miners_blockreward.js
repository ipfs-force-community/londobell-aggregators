// todo: 历史出块数
[
  {
    $match: {
      Depth: 2,
      "Msg.From": "02",
      "Msg.Method": 14,
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
    },
  },
  {
    $lookup: {
      from: "Message",
      localField: "Cid",
      foreignField: "_id",
      as: "blockrewardMatches",
    },
  },
  {
    $unwind: "$blockrewardMatches",
  },
  {
    $group: {
      _id: {Epoch: "$Epoch", Miner: "$Msg.To"},
      TotalBlockReward: {
        $sum: {
          $divide: [
            {
              $toDecimal: "$blockrewardMatches.Value",
            },
            1,
          ],
        },
      },
      BlockCount: {
        $sum: 1,
      },
    },
  },
]
