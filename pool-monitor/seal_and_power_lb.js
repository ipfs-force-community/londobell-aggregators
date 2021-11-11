var startEpoch = 1246320;
var endEpoch = 1249200;
var arr = new Array();
db.MinerSectorHealth.aggregate([{
    $match: {
        "Epoch": {
            $gte: startEpoch,
            $lte: endEpoch
        }
    }
}, {
    $sort: {
        Epoch: - 1
    }
}, {
    $group: {
        _id: "$Addr",
        maxData: {
            $first: "$$ROOT"
        },
        minData: {
            $last: "$$ROOT"
        }
    }
}]).forEach(function (item) {
    var endSectors = item.maxData.Detail.Active + item.maxData.Detail.Faults + item.maxData.Detail.Unproven + item.maxData.Detail.TerminatedSectors;
    var startSectors = item.minData.Detail.Active + item.minData.Detail.Faults + item.minData.Detail.Unproven + item.minData.Detail.TerminatedSectors;
    var data = new Object();
    data.Addr = item.maxData.Addr;
    data.Active = item.maxData.Detail.Active;
    data.Faults = item.maxData.Detail.Faults;
    data.Unproven = item.maxData.Detail.Unproven;
    data.TerminatedSectors = item.maxData.Detail.TerminatedSectors;
    data.Power = item.maxData.Detail.ActiveSectorsRawPower; // 原值算力
    data.QuaPower = item.maxData.Detail.ActiveSectorsQAPower; // 有效算力
    data.SectorsIncr = endSectors - startSectors; // 增长扇区数
    if (data.Active > 0) {
        data.SectorSize = parseInt(data.Power) / data.Active; // 扇区大小
        data.PowerIncr = (endSectors - startSectors) * data.SectorSize; // 扇区增量
    } else {
        data.SectorSize = 0;
        data.PowerIncr = 0;
    }
    arr.push(data);
});

arr.forEach(printjson);