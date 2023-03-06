// DealProposal
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Epoch", ctx.StartEpoch]},
                    {$or: [
                            {$eq: ["$Client", ctx.Addr]},
                            {$eq: ["$Provider", ctx.Addr]}
                        ]
                    }
                ]
            }
        },
    }
]