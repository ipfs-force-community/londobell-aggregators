module chain-data

go 1.16

require (
	github.com/filecoin-project/go-address v0.0.6
	github.com/filecoin-project/go-amt-ipld/v2 v2.1.1-0.20201006184820-924ee87a1349 // indirect
	github.com/filecoin-project/go-state-types v0.1.3
	github.com/filecoin-project/lotus v1.14.2
	github.com/filecoin-project/specs-actors/v6 v6.0.1
	github.com/filecoin-project/specs-actors/v7 v7.0.0-rc1
	github.com/ipfs/go-log/v2 v2.5.0
	github.com/urfave/cli/v2 v2.3.0
	go.uber.org/fx v1.13.1 // indirect
	golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
)

replace github.com/filecoin-project/filecoin-ffi => ./extern/filecoin-ffi
