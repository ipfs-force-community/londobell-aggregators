[
  {
    $match: {
      Epoch: {
        $gt: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
      },
      "Msg.To": "099",
      "Msg.Method": 0,
    },
  },
  {
    $project: {
      Cid: 1,
    },
  },
  {
    $lookup: {
      from: "Message",
      localField: "Cid",
      foreignField: "_id",
      as: "SelfRaw",
    },
  },
  {
    $unwind: "$SelfRaw",
  },
  {
    $group: {
      _id: "$SelfRaw.From",
      BurntFee: {
        $sum: {
          $toDecimal: "$SelfRaw.Value",
        },
      },
    },
  },
]
