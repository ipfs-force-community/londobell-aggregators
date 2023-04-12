// ExecTrace
// todo: skip或limit变大 变慢
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Depth", 1]},
                    {$gte: ["$Epoch", ctx.StartEpoch]},
                    {$lt: ["$Epoch", ctx.EndEpoch]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$Msg.From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$Msg.From", 0, 1] }]}
                        ]
                    }
                ]
            }
        }
    },
    {
        $sort: {
            Epoch: -1
        }
    },
    {
      $lookup:  {
          from: "Message",
          let: {cid: "$Cid"},
          pipeline: [
              {
                  $match:
                      {
                          $expr: {
                              $and: [
                                  {$eq: [ "$_id", "$$cid"]},
                                  {$eq: ["$Detail.Method", ctx.MethodName]},
                              ]
                          }
                      }
              }
          ],
          as: "message"
      }
    },
    {
        $unwind: "$message"
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    },
    {
        $project: {
            _id: 0,
            SignedCid:
                {$cond: {
                        if:{
                            $eq:["$message.SignedCid", null]
                        }, then: "$message._id",
                        else: "$message.SignedCid"
                    }
                },
            Epoch: "$Epoch",
            From: "$Msg.From",
            To: "$Msg.To",
            Value: "$message.Value",
            ExitCode: "$MsgRct.ExitCode",
            Method: "$message.Detail.Method"
        }
    }
]
