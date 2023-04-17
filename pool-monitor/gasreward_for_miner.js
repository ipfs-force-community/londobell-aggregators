// ExecTrace
[
  {
    $match: {
      Epoch: ctx.StartEpoch,
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
                  $eq: ["$Detail.Params.Miner", ctx.Addr],
                },
              ],
            },
          },
        },
      ],
      as: "message",
    },
  },
  {
    $unwind: "$message",
  },
  {
    $group: {
      _id: "$message.Detail.Params.Miner",
      totalWincount: {
        $sum: "$message.Detail.Params.WinCount",
      },
    },
  },
]
