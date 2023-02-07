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

//go:embed account_message_count.js
var accountMessageCountAggregator []byte

//go:embed all_owners.js
var allOwnerAggregator []byte

// todo: 单个区块消息平均 BlockHeader

// todo: minerfunds/power for owner: first get miners for owner, then add values of all miners

//go:embed minerfunds_for_owner.js
var minerFundsForOwnerAggregator []byte

//go:embed power_for_owner.js
var powerForOwnerAggregator []byte

// todo: sector state get from adapter

//go:embed total_block_count.js
var totalBlockCountAggregator []byte

//go:embed traces_for_message.js
var tracesForMessageAggregator []byte

//go:embed latest_tipset.js
var latestTipSetAggregator []byte

//go:embed actor_state.js
var actorStateAggregator []byte

//go:embed tipset.js
var tipsetAggregator []byte

//go:embed miner_info.js
var minerInfoAggregator []byte

//go:embed balance.js
var balanceAggregator []byte

//go:embed miners_for_owner.js
var minersForOwnerAggregator []byte

//go:embed messagses_for_actor.js
var messagesForActorAggregator []byte

//go:embed transfer_messages.js
var transferMessagesAggregator []byte

//go:embed time_of_trace.js
var timeOfTraceAggregator []byte

//go:embed createtime.js
var createTimeAggregator []byte

//go:embed gascost_for_sector.js
var gasCostForSectorAggregator []byte

//go:embed transfer_message_for_large_amount.js
var transferMessageForLargeAmountAggregator []byte

//go:embed deals.js
var dealsAggregator []byte

//go:embed detail_for_deal.js
var detailForDealAggregator []byte

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

func GetLatestTipSetAggregator() []byte {
	return latestTipSetAggregator
}

func GetTotalBlockCountAggregator() []byte {
	return totalBlockCountAggregator
}

func GetActorStateAggregator() []byte {
	return actorStateAggregator
}

func GetTipSetAggregator() []byte {
	return tipsetAggregator
}

func GetMinerInfoAggregator() []byte {
	return minerInfoAggregator
}

func GetBalanceAggregator() []byte {
	return balanceAggregator
}

func GetMinersForOwnerAggregator() []byte {
	return minersForOwnerAggregator
}

func GetMessagesForActorAggregator() []byte {
	return messagesForActorAggregator
}

func GetTransferMessagesAggregator() []byte {
	return transferMessagesAggregator
}

func GetTimeOfTraceAggregator() []byte {
	return timeOfTraceAggregator
}

func GetCreateTimeAggregator() []byte {
	return createTimeAggregator
}

func GetGasCostForSectorAggregator() []byte {
	return gasCostForSectorAggregator
}

func GetTransferMessageForLargeAmountAggregator() []byte {
	return transferMessageForLargeAmountAggregator
}

func GetDealsAggregator() []byte {
	return dealsAggregator
}

func GetDetailForDealAggregator() []byte {
	return detailForDealAggregator
}
