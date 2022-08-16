[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
      "Msg.Method": 25,
      "MsgRct.ExitCode": 0,
      Depth: 1,
    },
  },
  {
    $project: {
      Cid: 1,
      Msg: 1,
    },
  },
  {
    $lookup: {
      from: "Message",
      let: {
        mcid: "$Cid",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$_id", "$$mcid"],
                },
                {
                  $eq: ["$Detail.Method", "PreCommitSectorBatch"],
                },
              ],
            },
          },
        },
        {
          $project: {
            Detail: 1,
            To: 1,
          },
        },
      ],
      as: "ParentRaw",
    },
  },
  {
    $match: {
      ParentRaw: {
        $exists: true,
        $not: {
          $size: 0,
        },
      },
    },
  },
  {
    $unwind: "$ParentRaw",
  },
  {
    $group: {
      _id: "$ParentRaw.To",
      sectorsSum: {
        $sum: {
          $size: "$ParentRaw.Detail.Params.Sectors",
        },
      },
    },
  },
  {
    $addFields: {
      preAggGasFee: {
        $multiply: ["$sectorsSum", 4.108331e15],
      },
    },
  },
]
