// traverse all miners to get specified owner which miners belong to
// MinerFunds
// todo: 不再活跃的miner不记录在表里
[
    {
        $match: {
            "Info.Owner": ctx.Addr,
            // Epoch: {
            //     $gte: ctx.StartEpoch,
            //     $lt: ctx.EndEpoch
            // }
        }
    },
    {
        $group: {
            _id: "$Info.Owner",
            Addrs: {$addToSet: "$Addr"}
        }
    }
]
