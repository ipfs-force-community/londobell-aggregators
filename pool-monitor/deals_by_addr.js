// DealProposal

// 先放后db: 取>=startEpoch第二小epoch的第一个ID 作为起始ID
// 先放前db: 取<endEpoch最大epoch的最后一个ID 作为终止ID
// 保证前后db ID连续
[
    {
        $match: {
            $and: [
                {"_id": {$gte: ctx.Start, $lt: ctx.End}}, // todo: 标识新发布的deal ID  取第二小epoch的第一个ID
                {$or: [{"ProviderID": ctx.Addr}, {"ClientID": ctx.Addr}]}
            ]
        },
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]
