// ActorAddress
[
    {
        $match: {
            $or: [
                {"_id": ctx.Addr},
                {"RobustAddress": ctx.Addr},
                {"DelegatedAddress": ctx.Addr}
            ]
        }
    },
    {
        $project: {
            _id: 0,
            ActorID: "$_id",
            RobustAddress: "$RobustAddress",
            DelegatedAddress: "$DelegatedAddress"
        }
    },
    // {
    //     $project: {
    //         Address: {
    //             $concatArrays: [
    //                 ["$_id"],
    //                 ["$RobustAddress"],
    //                 ["$DelegatedAddress"]
    //             ]
    //         }
    //     }
    // }
]
