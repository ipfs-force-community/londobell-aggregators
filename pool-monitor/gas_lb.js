[
  {
    $match: {
      Depth: 1,
      Epoch: {
        $gt: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
      },
      "Msg.To": /^0/,
    },
  },
  {
    $group: {
      _id: {
        to: "$Msg.To",
        exit_code: {
          $cond: {
            if: {
              $eq: ["$MsgRct.ExitCode", 0],
            },
            then: 0,
            else: -1,
          },
        },
      },
      gas_fee: {
        $sum: {
          $toDouble: "$GasCost.TotalCost",
        },
      },
      message_count: {
        $sum: 1,
      },
    },
  },
]
