var startEpoch = 1246320;
var endEpoch = 1249200;
var res = db.ExecTrace.aggregate([
  {
    $match: {
      Depth: 1,
      Epoch: {
        $gt: startEpoch,
        $lte: endEpoch,
      },
      "Msg.To": /^0/,
    },
  },
  {
    $group: {
      _id: {
        to: "$Msg.To",
        exit_code: {
          $cond: {
            if: {
              $eq: ["$MsgRct.ExitCode", 0],
            },
            then: 0,
            else: -1,
          },
        },
      },
      gas_fee: {
        $sum: {
          $toDouble: "$GasCost.TotalCost",
        },
      },
      message_count: {
        $sum: 1,
      },
    },
  },
]);

res.forEach(printjson);
