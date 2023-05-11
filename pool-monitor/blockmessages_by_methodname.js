// ExecTrace
// todo: skip或limit变大 变慢
[
    {
        $match: {
            $and: [
                {"Depth": 1},
                {"Epoch": {$gte: ctx.StartEpoch, $lt: ctx.EndEpoch}},
                {$or: [{"Msg.From":{$regex: /^1/}}, {"Msg.From":{$regex: /^3/}}, {"Msg.From":{$regex: /^4/}}]},
            ]
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
              },
              {
                  $project: {
                      // _id: 1,
                      // "SignedCid": 1,
                      Value: 1,
                      "Detail.Method": 1
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
                            $eq:["$SignedCid", null]
                        }, then: "$Cid",
                        else: "$SignedCid"
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
