// DealProposal
[
    {
        $match: {
            $and: [
                {"Epoch": ctx.StartEpoch},
                {$or: [{"Client": {$in: ctx.Addrs}}, {"Provider": {$in: ctx.Addrs}}]}
            ]

            // $expr: {
            //     $and: [
            //         {$eq: ["$Epoch", ctx.StartEpoch]},
            //         {$or: [
            //                 {$in: ["$Client", ctx.Addrs]},
            //                 {$in: ["$Provider", ctx.Addrs]}
            //             ]
            //         }
            //     ]
            // }
        },
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $skip: ctx.Skip
    },
    {
        $limit: ctx.Limit
    }
]
