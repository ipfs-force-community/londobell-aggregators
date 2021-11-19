// 3.158s
var startEpoch = 1090000;
var endEpoch = 1097835;
var minerAddr = "0519333";

db.ExecTrace.aggregate([
  {
    $match: {
      Epoch: {
        $gt: startEpoch,
        $lte: endEpoch,
      },
      Depth: 2,
      "Msg.From": "02",
      "Msg.To": minerAddr,
      "Msg.Method": 14,
      SubCallCount: 1,
    },
  },
  {
    $lookup: {
      from: "Message",
      localField: "Cid",
      foreignField: "_id",
      as: "blockrewardMatches",
    },
  },
  {
    $unwind: "$blockrewardMatches",
  },
  {
    $group: {
      _id: "$Msg.To",
      totalBlockReward: {
        $sum: {
          $divide: [
            {
              $toDecimal: "$blockrewardMatches.Value",
            },
            1e18,
          ],
        },
      },
      blockcount: {
        $sum: 1,
      },
    },
  },
]);
