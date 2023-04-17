// todo: 历史出块数
[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
      Depth: 2,
      "Msg.From": "02",
      "Msg.Method": 14,
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
      totalBlockReward: {
        $sum: {
          $divide: [
            {
              $toDecimal: "$blockrewardMatches.Value",
            },
            1,
          ],
        },
      },
      blockcount: {
        $sum: 1,
      },
    },
  },
]
