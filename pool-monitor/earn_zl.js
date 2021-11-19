[
  {
    $match: {
      Epoch: {
        $gt: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
      },
      Depth: 2,
      "Msg.From": "02",
      "Msg.To": ctx.MinerAddr,
      "Msg.Method": 14,
      SubCallCount: 1,
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
      _id: "$Msg.To",
      totalBlockReward: {
        $sum: {
          $divide: [
            {
              $toDecimal: "$blockrewardMatches.Value",
            },
            1e18,
          ],
        },
      },
      blockcount: {
        $sum: 1,
      },
    },
  },
]
