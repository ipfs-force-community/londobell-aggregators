[
    {
        $match: {
            "Epoch": {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            }
        }
    }
]
