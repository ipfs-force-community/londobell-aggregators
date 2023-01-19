// ExecTrace
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Depth: 1,
            "Msg.From": ctx.Addr
        }
    },
    {
        $group: {
            _id: "$Msg.From",
            messageCount: {$sum: 1}
        },
    }
]