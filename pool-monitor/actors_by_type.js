// ActorBalance
// todo: ActorBalance弃用，使用ChangedActor
[
    {
        $match: {
            Epoch: ctx.StartEpoch,
            "Code": ctx.ActorType,
        }
    },
    {
        $group: {
            _id: "$ActorID"
        }
    }
]