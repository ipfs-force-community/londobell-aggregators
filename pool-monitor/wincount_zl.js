[
  {
    $match: {
      Epoch: {
        $gt: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
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
                  $eq: ["$Detail.Params.Miner", ctx.MinerAddr],
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
      totalWincount: {
        $sum: "$wincountMatches.Detail.Params.WinCount",
      },
    },
  },
]
