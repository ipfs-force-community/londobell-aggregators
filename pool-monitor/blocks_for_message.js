// MessageBlock
[
    {
        $match: {
            _id: ctx.Cid,
            Epoch: ctx.StartEpoch
        }
    }
]