[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
      Depth: 2,
      "Msg.From": "02",
      "Msg.To": ctx.Addr,
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
      _id: "$Epoch",
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
