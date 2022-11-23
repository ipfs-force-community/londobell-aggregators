[
  {
    $match: {
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
      "Msg.Method": {$in: [25, 28]},
      "MsgRct.ExitCode": 0,
      Depth: 1,
    },
  },
  {
    $project: {
      Cid: 1,
      Msg: 1,
      Epoch: 1,
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
                  $or: [
                    {$eq: ["$Detail.Method", "PreCommitSectorBatch"]},
                    {$eq: ["$Detail.Method", "PreCommitSectorBatch2"]}
                  ]
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
    $lookup: {
      from: "Tipset",
      localField: "Epoch",
      foreignField: "ChildEpoch",
      as: "BaseFee",
    },
  },
  {
    $unwind: "$BaseFee",
  },
  {
    $project: {
      miner: "$ParentRaw.To",
      epoch: "$Epoch",
      sectorCount: {
        $sum: {
          $size: "$ParentRaw.Detail.Params.Sectors",
        },
      },
      signedCid: "$Cid",
      methodName: "$ParentRaw.Detail.Method",
      baseFee: {
        $toDecimal: "$BaseFee.BaseFee",
      },
    },
  },
  {
    $addFields: {
      aggFee: {
        $toDecimal: {
          $multiply: [
            "$sectorCount",
            {$multiply: [821666.2, {$max: [5000000000, "$baseFee"]}]},
          ],
        }
      },
      blockTime: {
        $add: [1598306400, { $multiply: ["$epoch", 30] }],
      },
    },
  },
]
