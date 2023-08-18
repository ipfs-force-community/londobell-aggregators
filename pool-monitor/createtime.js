// ExecTrace
// f2 actor: created by "01" with "Exec";
// miner actor: created by "04" with "CreateMiner"
// evm actor: created by "010" with "CreateExternal"
// todo: miner actor也会通过"Exec"来创建吗？
[
    {
        $match: {
            $and: [
                {"IsBlock":true},
                {"Msg.MethodName": ctx.MethodName},
                {"MsgRct.ExitCode": 0},
                {$or: [
                        {"Detail.Return.RobustAddress": ctx.Addr},
                        {"Detail.Return.ActorID": ctx.ID},
                        {"Detail.Return.IDAddress": ctx.IDStr},
                    ]},
            ]
        }
    },
    {
        $project: {
            _id: 0,
            Epoch: "$Epoch"
        }
    }
]
