// todo: 历史出块数
[
  {
    $match: {
      Depth: 1,
      "Msg.From": "00",
      "Msg.To": "02",
      "Msg.Method": 2,
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
    },
  },
  {
    $lookup: {
      from: "Message",
      let: {
        cid: "$Cid",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$$cid", "$_id"],
                },
              ],
            },
          },
        },
      ],
      as: "wincountMatches",
    },
  },
  {
    $unwind: "$wincountMatches",
  },
  {
    $project: {
      Miner: "$wincountMatches.Detail.Params.Miner",
      Wincount: "$wincountMatches.Detail.Params.WinCount",
      GasReward: {$toDecimal: "$wincountMatches.Detail.Params.GasReward"}
    }
  }
  // {
  //   $group: {
  //     _id: "$wincountMatches.Detail.Params.Miner",
  //     TotalWincount: {
  //       $sum: "$wincountMatches.Detail.Params.WinCount",
  //     },
  //     TotalGasReward: { //get for per epoch
  //       $sum: {$toDecimal: "$wincountMatches.Detail.Params.GasReward"}
  //     }
  //   },
  // },
]
