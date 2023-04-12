// ActorState
// reward, power
// todo: create index: Epoch_1_Code_1_Addr_1
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            Addr: ctx.Addr
        }
    }
]