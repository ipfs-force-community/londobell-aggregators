// DealProposal
// 每2小时记录一次，时间间隔不能太长，否则可能会有在该段时间内published deal又已slashed，导致未记录的情况
// todo: 未来订单能续期后，主键需更改epoch-id
[
    {
        $match: {
            _id: {$gte: ctx.Start, $lt: ctx.End}
        },
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $skip: ctx.Skip,
    },
    {
        $limit: ctx.Limit
    }
]