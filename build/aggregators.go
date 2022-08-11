package build

//go:embed pool-monitor/address.js
var addressAggregator []byte

//go:embed pool-monitor/agg_pre_netfee.js
var aggPreNetfeeAggregator []byte

//go:embed pool-monitor/agg_pro_netfee.js
var aggProNetfeeAggregator []byte

//go:embed pool-monitor/block.js
var blockAggregator []byte

//go:embed pool-monitor/burn_fee_all_lb.js
var burnFeeAllLbAggregator []byte

//go:embed pool-monitor/final_height.js
var finalHeightAggregator []byte

//go:embed pool-monitor/gas_lb.js
var gasLbAggregator []byte

//go:embed pool-monitor/miner_blockreward.js
var minerBlockrewardAggregator []byte

//go:embed pool-monitor/miners_info.js
var minersInfoAggregator []byte

//go:embed pool-monitor/miners_mined.js
var minersMinedAggregator []byte

//go:embed pool-monitor/multisig_message.js
var multisigMessageAggregator []byte

//go:embed pool-monitor/multisig_state.js
var multisigStateAggregator []byte

//go:embed pool-monitor/pledge_lb.js
var pledgeLbAggregator []byte

//go:embed pool-monitor/pre_netfee_lb.js
var preNetfeeLbAggregator []byte

//go:embed pool-monitor/pro_netfee_lb.js
var proNetfeeLbAggregator []byte

//go:embed pool-monitor/punishment.js
var punishmentAggregator []byte

//go:embed pool-monitor/seal_and_power_lb.js
var sealAndPowerLbAggregator []byte

//go:embed pool-monitor/wincount_zl.js
var wincountZlAggregator []byte

func GetAddressAggregator() []byte {
	return addressAggregator
}

func GetAggPreNetfeeAggregator() []byte {
	return aggPreNetfeeAggregator
}

func GetAggProNetfeeAggregator() []byte {
	return aggProNetfeeAggregator
}

func GetBlockAggregator() []byte {
	return blockAggregator
}

func GetBurnFeeAllLbAggregator() []byte {
	return burnFeeAllLbAggregator
}

func GetFinalHeightAggregator() []byte {
	return finalHeightAggregator
}

func GetGasLbAggregator() []byte {
	return gasLbAggregator
}

func GetMinerBlockrewardAggregator() []byte {
	return minerBlockrewardAggregator
}

func GetMinersInfoAggregator() []byte {
	return minersInfoAggregator
}

func GetMinersMinedAggregator() []byte {
	return minersMinedAggregator
}

func GetMultisigMessageAggregator() []byte {
	return multisigMessageAggregator
}

func GetMultisigStateAggregator() []byte {
	return multisigStateAggregator
}

func GetPledgeLbAggregator() []byte {
	return pledgeLbAggregator
}

func GetPreNetfeeLbAggregator() []byte {
	return preNetfeeLbAggregator
}

func GetProNetfeeLbAggregator() []byte {
	return proNetfeeLbAggregator
}

func GetPunishmentAggregator() []byte {
	return punishmentAggregator
}

func GetSealAndPowerLbAggregator() []byte {
	return sealAndPowerLbAggregator
}

func GetWincountZlAggregator() []byte {
	return wincountZlAggregator
}
