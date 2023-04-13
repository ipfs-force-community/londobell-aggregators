// DealProposal
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Epoch", ctx.StartEpoch]},
                    {$or: [
                            {$in: ["$Client", ctx.Addrs]},
                            {$in: ["$Provider", ctx.Addrs]}
                        ]
                    }
                ]
            }
        },
    }
]