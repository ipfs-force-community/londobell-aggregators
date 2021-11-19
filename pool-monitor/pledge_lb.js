[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
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
        $first: "$Detail.InitialPledge",
      },
      minData: {
        $last: "$Detail.InitialPledge",
      },
    },
  },
]
