// ExecTrace
// todo: 全网分段计算
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
            Depth: 1,
            "Msg.From": "00",
            "Msg.To": "02",
            "Msg.Method": 2,
        }
    },
    {
        $group: {
            _id: 0,
            TotalBlockCount: {$sum: 1}
        }
    }
]