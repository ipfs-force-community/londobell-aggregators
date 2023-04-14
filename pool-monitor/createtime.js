// ExecTrace
// f2 actor: created by "01" with "Exec";
// miner actor: created by "04" with "CreateMiner"
// evm actor: created by "010" with "CreateExternal"
// todo: miner actor也会通过"Exec"来创建吗？
[
    {
        $match: {
            "Msg.To": ctx.To,
            "Msg.Method": ctx.Method,
            "Detail.Return.RobustAddress": ctx.Addr
        }
    },
    {
        $project: {
            _id: 0,
            Epoch: "$Epoch"
        }
    }
]
