// ActorState
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr
        }
    }
]