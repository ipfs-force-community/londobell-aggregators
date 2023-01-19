// ExecTrace
[
    {
        $match: {
            $expr: {
                $or:[
                    {$eq: ["Msg.From", ctx.Addr]},
                    {$eq: ["Msg.To", ctx.Addr]}
                ]
            }
        }
    },
    {
        $sort: {
            "Epoch": ctx.sort  // 1: createTime; -1: latestTime
        }
    },
    {
        $limit: 1
    }
]