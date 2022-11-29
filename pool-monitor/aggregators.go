package pool_monitor

import (
	_ "embed"
)

//go:embed address.js
var addressAggregator []byte

//go:embed agg_pre_netfee.js
var aggPreNetfeeAggregator []byte

//go:embed agg_pro_netfee.js
var aggProNetfeeAggregator []byte

//go:embed block.js
var blockAggregator []byte

//go:embed burn_fee_all_lb.js
var burnFeeAllLbAggregator []byte

//go:embed final_height.js
var finalHeightAggregator []byte

//go:embed gas_lb.js
var gasLbAggregator []byte

//go:embed miner_blockreward.js
var minerBlockrewardAggregator []byte

//go:embed miners_info.js
var minersInfoAggregator []byte

//go:embed miners_mined.js
var minersMinedAggregator []byte

//go:embed multisig_message.js
var multisigMessageAggregator []byte

//go:embed multisig_state.js
var multisigStateAggregator []byte

//go:embed pledge_lb.js
var pledgeLbAggregator []byte

//go:embed pre_netfee_lb.js
var preNetfeeLbAggregator []byte

//go:embed pro_netfee_lb.js
var proNetfeeLbAggregator []byte

//go:embed punishment.js
var punishmentAggregator []byte

//go:embed seal_and_power_lb.js
var sealAndPowerLbAggregator []byte

//go:embed wincount_zl.js
var wincountZlAggregator []byte

//go:embed traces.js
var tracesAggregator []byte

//go:embed child_epoch.js
var childEpochAggregator []byte

//go:embed miners_blockreward.js
var minersBlockRewardAggregator []byte

//go:embed burn_monitor.js
var burnMonitorAggregator []byte

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

func GetTracesAggregator() []byte {
	return tracesAggregator
}

func GetChildEpochAggregator() []byte {
	return childEpochAggregator
}

func GetMinersBlockRewardAggregator() []byte {
	return minersBlockRewardAggregator
}

func GetBurnMonitorAggregator() []byte {
	return burnMonitorAggregator
}
