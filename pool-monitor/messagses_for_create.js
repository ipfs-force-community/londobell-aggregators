// CreateMessage
// ms ActorID_1_IsBlock_1_Epoch_1
[
	{
		$match: {
			"ActorID": ctx.Addr,
			"IsBlock": true,
		}
	},
	{
		$sort: {
			Epoch: -1
		}
	},
	{
		$skip: ctx.Skip
	},		
	{
		$limit: ctx.Limit
	},
	{
		$project: {
			_id: 0,
			Cid: {
				$cond: {
					if:{
						$eq:["$SignedCid", null]
					}, then: "$Cid",
					else: "$SignedCid"
				}
			},
            RootCid: {
                $cond: {
                    if: {
                        $eq: ["$RootSignedCid", null]
                    }, then: "$RootCid",
                    else: "$RootSignedCid"
                }
            },			
			Epoch: "$Epoch",
			From: "$From",
			To: "$To",
			Value: "$Value",
			ExitCode: "$ExitCode",
			Method: "$MethodName",
		}
	}
]