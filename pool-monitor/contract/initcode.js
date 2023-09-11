// EvmInitCode
// todo: 增加Creator
[
    {
        $match: {
            _id: ctx.Addr
        }
    },
    {
        $project: {
            InitCode: "$InitCode"
        }
    }
]