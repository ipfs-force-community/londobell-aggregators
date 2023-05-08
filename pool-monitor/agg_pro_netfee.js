[
  {
    $match: {
      Depth: 2,
      "Msg.To": "099",
      "Msg.Method": 0,
      Epoch: {
        $gte: ctx.StartEpoch,
        $lt: ctx.EndEpoch,
      },
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
      as: "basefee",
    },
  },
  {
    $unwind: "$basefee",
  },
  {
    $project: {
      Cid: "$ParentRaw._id",
      Epoch: "$Epoch",
      AggFee: {$toDecimal: "$SelfRaw.Value"},
      MethodName: "$ParentRaw.Detail.Method",
      Miner: "$SelfRaw.From",
      SectorCount: {
        $toInt: {
          $divide: [
            {
              $toDecimal: "$SelfRaw.Value",
            },
            {
              $multiply: [
                2464998.65,
                {
                  $max: [5000000000, "$BaseFee"],
                },
              ],
            },
          ],
        }
      },
      BaseFee: {
        $toDecimal: "$basefee.BaseFee",
      },
    },
  },
  {
    $addFields: {
      BlockTime: {
        $add: [
          1598306400,
          {
            $multiply: ["$Epoch", 30],
          },
        ],
      },
    },
  },
]
