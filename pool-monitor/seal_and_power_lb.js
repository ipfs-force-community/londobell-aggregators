[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
    },
  },
  {
    $sort: {
      Epoch: -1,
    },
  },
  {
    $group: {
      _id: "$Addr",
      maxData: {
        $first: "$$ROOT",
      },
      minData: {
        $last: "$$ROOT",
      },
    },
  },
]
