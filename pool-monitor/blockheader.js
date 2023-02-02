// BlockHeader
// bcid, mcid, messagecount, Ticket, ElectionProof

// 平均每高度消息数（可能有空块）
[
    {
        $match: {
            Epoch: {
                $gte: ctx.StartEpoch,
                $lt: ctx.EndEpoch,
            },
        }
    }
]