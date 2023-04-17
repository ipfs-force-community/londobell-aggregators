// ActorState
// reward, power
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr
        }
    }
]