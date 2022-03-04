[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq:[{$in: [ctx.Addr, "$Addresses"]}, true]}
                ]
            }
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            Addresses: 1
        }
    }
]
