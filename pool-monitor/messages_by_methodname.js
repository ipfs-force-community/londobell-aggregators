// Message
[
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: ["$Detail.Method", ctx.MethodName]},
                    {$or: [
                            {$eq: ["1", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["3", {$substrBytes: ["$From", 0, 1] }]},
                            {$eq: ["4", {$substrBytes: ["$From", 0, 1] }]}
                        ]
                    }
                ]
            }
        }
    }
]