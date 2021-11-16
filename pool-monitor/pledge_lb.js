// 1.04s
var startEpoch = 1246320;
var endEpoch = 1249200;
db.MinerFunds.aggregate([
  {
    $match: {
      Epoch: {
        $gte: startEpoch,
        $lte: endEpoch,
      },
    },
  },
  {
    $sort: {
      Epoch: -1,
    },
  },
  {
    $group: {
      _id: "$Addr",
      maxData: {
        $first: "$Detail.InitialPledge",
      },
      minData: {
        $last: "$Detail.InitialPledge",
      },
    },
  },
]);
