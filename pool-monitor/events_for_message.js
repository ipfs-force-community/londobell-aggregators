// ActorEvent
[
    {
        $match: {
            $or: [{"Cid": ctx.Cid}, {"SignedCid": ctx.Cid}]
        }
    }
]