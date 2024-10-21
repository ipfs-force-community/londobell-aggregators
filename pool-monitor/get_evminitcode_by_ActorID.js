// EvmInitCode
[
    {
        $match: {
            _id: ctx.Addr
        }
    },
    {
        $project: {
            _id: 0,
            InitCode: 1
        }
    }
]