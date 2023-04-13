// todo: 历史出块数
[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
      Depth: 1,
      "Msg.From": "00",
      "Msg.To": "02",
      "Msg.Method": 2,
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
                {
                  $eq: ["$Detail.Params.Miner", ctx.Addr], //todo: f2地址？
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
    $group: {
      _id: "$wincountMatches.Detail.Params.Miner",
      TotalWincount: {
        $sum: "$wincountMatches.Detail.Params.WinCount",
      },
      TotalGasReward: { //get for per epoch
        $sum: {$toDecimal: "$wincountMatches.Detail.Params.GasReward"}
      }
    },
  },
]
