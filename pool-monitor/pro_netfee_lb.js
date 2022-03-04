[
  {
    $match: {
      Epoch: {
        $gt: ctx.StartEpoch,
        $lte: ctx.EndEpoch,
      },
      "Msg.To": "099",
      "Msg.Method": 0,
      Depth: 2,
    },
  },
  {
    $project: {
      Seq: 1,
      Cid: 1,
      Epoch: 1,
    },
  },
  {
    $lookup: {
      from: "ExecTrace",
      let: {
        epoch: "$Epoch",
        seq: "$Seq",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$Epoch", "$$epoch"],
                },
                {
                  $eq: ["$Depth", 1],
                },
                {
                  $eq: [
                    {
                      $first: "$Seq",
                    },
                    {
                      $first: "$$seq",
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          $project: {
            Cid: 1,
          },
        },
      ],
      as: "Parent",
    },
  },
  {
    $unwind: "$Parent",
  },
  {
    $lookup: {
      from: "Message",
      let: {
        mcid: "$Parent.Cid",
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
                  $eq: ["$Detail.Method", "ProveCommitAggregate"],
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            "Detail.Method": 1,
            "Detail.Actor": 1,
          },
        },
      ],
      as: "ParentRaw",
    },
  },
  {
    $unwind: "$ParentRaw",
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
      cid: "$ParentRaw._id",
      epoch: "$Epoch",
      aggFee: "$SelfRaw.Value",
      methodName: "$ParentRaw.Detail.Method",
      miner: "$SelfRaw.From",
      SectorCount: {
        $divide: [
          {
            $toDecimal: "$SelfRaw.Value",
          },
          {
            $multiply: [
              2464998.65,
              {
                $max: [5000000000, "$baseFee"],
              },
            ],
          },
        ],
      },
      baseFee: {
        $toDecimal: "$BaseFee.BaseFee",
      },
    },
  },
  {
    $addFields: {
      blockTime: {
        $add: [1598306400, { $multiply: ["$epoch", 30] }],
      },
    },
  },
];
