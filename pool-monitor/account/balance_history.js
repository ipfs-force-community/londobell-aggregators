// ActorState
[
    {
        $macth: {
            Addr: ctx.Addr,
            Epoch: ctx.StartEpoch
        }
    },
    {
        $project: {
            Epoch: "$Epoch",
            Balance: "$Balance"
        }
    }
]