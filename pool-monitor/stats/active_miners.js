// MinerFunds
[
    {
        $match: {
            Epoch: ctx.StartEpoch  // 根据请求高度得到最新表高度
        }
    },
    {
        $group: {
            _id: 0,
            ActiveMiners: {$addToSet: "$Addr"}
        }
    }
]