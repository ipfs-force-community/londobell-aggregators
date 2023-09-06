// CreateMessage Epoch
// todo: evmActor created at CreateExternal
[
    {
        $match: {
            "ActorID": ctx.Addr,
            "IsBlock": true,
        }
    },
    {
        $sort: {
            "Epoch": 1  // 创建表理论上含有ActorID的doc只有一个
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            Epoch: "$Epoch"
        }
    }
]