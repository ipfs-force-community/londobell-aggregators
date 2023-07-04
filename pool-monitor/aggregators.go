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

//go:embed wincount_for_miner.js
var wincountForMinerAggregator []byte

//go:embed traces.js
var tracesAggregator []byte

//go:embed child_epoch.js
var childEpochAggregator []byte

//go:embed miners_blockreward.js
var minersBlockRewardAggregator []byte

//go:embed burn_monitor.js
var burnMonitorAggregator []byte

////go:embed account_message_count.js
//var accountMessageCountAggregator []byte

// todo: 单个区块消息平均 BlockHeader

// todo: minerfunds/power for owner: first get miners for owner, then add values of all miners

//go:embed minerfunds_for_owner.js
var minerFundsForOwnerAggregator []byte

//go:embed power_for_owner.js
var powerForOwnerAggregator []byte

// todo: sector state get from adapter

//go:embed total_block_count.js
var totalBlockCountAggregator []byte

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

//go:embed create_message.js
var createMessageAggregator []byte

//go:embed gascost_for_sector.js
var gasCostForSectorAggregator []byte

//go:embed transfer_message_for_large_amount.js
var transferMessageForLargeAmountAggregator []byte

//go:embed deals.js
var dealsAggregator []byte

//go:embed deal_by_id.js
var dealByIDAggregator []byte

//go:embed detail_for_deal.js
var detailForDealAggregator []byte

//go:embed blockheader.js
var blockHeaderAggregator []byte

//go:embed trace_for_message.js
var traceForMessageAggregator []byte

//go:embed batch_trace_for_message.js
var batchTraceForMessageAggregator []byte

//go:embed child_calls_for_message.js
var childCallsForMessageAggregator []byte

//go:embed all_owners.js
var allOwnersAggregator []byte

//go:embed parent_tipset.js
var parentTipSetAggregator []byte

//go:embed blockheader_by_cid.js
var blockHeaderByCidAggregator []byte

//go:embed blockmessages_by_methodname.js
var blockMessagesByMethodNameAggregator []byte

//go:embed actormessages_by_methodname.js
var actorMessagesByMethodNameAggregator []byte

//go:embed blockheaders_by_miner.js
var blockHeadersByMinerAggregator []byte

//go:embed deals_by_addr.js
var dealsByAddrAggregator []byte

//go:embed all_methods.js
var allMethodsAggregator []byte

////go:embed all_methods_for_actor.js
//var allMethodsForActorAggregator []byte

//go:embed blocks_for_message.js
var blocksForMessageAggregator []byte

//go:embed count_and_methodnames_of_messages_for_blockheader.js
var countAndMethodNameOfMessagesForBlockHeaderAggregator []byte

//go:embed messages_for_block.js
var messagesForBlockAggregator []byte

//go:embed count_of_messages_for_blockheader_by_methodname.js
var countOfMessagesForBlockHeaderByMethodNameAggregator []byte

//go:embed blockheadermessages_by_methodname.js
var blockHeaderMessagesByMethodNameAggregator []byte

////go:embed all_actors_for_blockmessage.js
//var allActorsForBlockMessageAggregator []byte

//go:embed count_of_transfer_for_actor.js
var transferCountForActorAggregator []byte

//go:embed minedcount_for_miners.js
var minedCountForMinersAggregator []byte

////go:embed all_methods_for_fromactors.js
//var allMethodsForFromActorsAggregator []byte

////go:embed all_methods_for_toactors.js
//var allMethodsForToActorsAggregator []byte

//go:embed boundary_of_db.js
var boundaryOfDBAggregator []byte

//go:embed count_of_blockmessages_by_methodname.js
var countOfBlockMessagesByMethodNameAggregator []byte

//go:embed count_of_actormessages_by_methodname.js
var countOfActorMessagesByMethodNameAggregator []byte

//go:embed count_of_transfers_for_actor2.js
var countOfTransfersForActor2Aggregator []byte

//go:embed count_of_largeamount_transfers.js
var countOfLargeAmountTransfersAggregator []byte

//go:embed richlist.js
var richListAggregator []byte

//go:embed count_of_messages_for_actor.js
var countOfMessageForActorAggregator []byte

//go:embed all_methodNames_for_actor.js
var allMethodNamesForActor []byte

//go:embed mined_by_miner_range.js
var minedByMinerRangeAggregator []byte

//go:embed all_blockMethodNames.js
var allBlockMethodNamesAggregator []byte

//go:embed all_methodNames_for_actors.js
var allMethodNamesForActorsAggregator []byte

//go:embed all_actors_msgscount.js
var allActorsMsgsCountAggregator []byte

//go:embed all_miners_minedCount.js
var allMinersMinedCountAggregator []byte

//go:embed count_of_blockmessages.js
var countOfBlockMessagesAggregator []byte

//go:embed transfermsgs_for_actor.js
var transferMsgsForActorAggregator []byte

//go:embed messagecid_by_hash.js
var messageCidByHashAggregator []byte

//go:embed eventsroot.js
var eventsRootAggregator []byte

//go:embed get_evminitcode_by_ActorID.js
var getEvmInitCodeByActorIDAggregator []byte

//go:embed hash_by_messagecid.js
var hashByMessageCidAggregator []byte

//go:embed child_transfers_for_message.js
var childTransfersForMessageAggregator []byte

//go:embed initcode_for_evm.js
var initCodeForEvmAggregator []byte

//go:embed events_by_actor.js
var eventsByActorAggregator []byte

//go:embed count_of_events_for_actor.js
var countOfEventsForActorAggregator []byte

//go:embed events_for_message.js
var eventsForMessageAggregator []byte

//go:embed events_for_epochrange.js
var eventsForEpochRangeAggregator []byte

//go:embed start_dealid.js
var startDealIDAggregator []byte

//go:embed end_dealid.js
var endDealIDAggregator []byte

//go:embed startepoch_for_deal.js
var startEpochForDealAggregator []byte

//go:embed count_of_deals_by_addr.js
var countOfDealsByAddrAggregator []byte

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

func GetWincountForMinerAggregator() []byte {
	return wincountForMinerAggregator
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

func GetCreateMessageAggregator() []byte {
	return createMessageAggregator
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

func GetDealByIDAggregator() []byte {
	return dealByIDAggregator
}

func GetDetailForDealAggregator() []byte {
	return detailForDealAggregator
}

func GetBlockHeaderAggregator() []byte {
	return blockHeaderAggregator
}

func GetTraceForMessageAggregator() []byte {
	return traceForMessageAggregator
}

func GetBatchTraceForMessageAggregator() []byte {
	return batchTraceForMessageAggregator
}

func GetChildCallsForMessageAggregator() []byte {
	return childCallsForMessageAggregator
}

func GetAllOwnersAggregator() []byte {
	return allOwnersAggregator
}

func GetParentTipSetAggregator() []byte {
	return parentTipSetAggregator
}

func GetBlockHeaderByCidAggregator() []byte {
	return blockHeaderByCidAggregator
}

func GetBlockMessagesByMethodNameAggregator() []byte {
	return blockMessagesByMethodNameAggregator
}

func GetActorMessagesByMethodNameAggregator() []byte {
	return actorMessagesByMethodNameAggregator
}

func GetBlockHeadersByMinerAggregator() []byte {
	return blockHeadersByMinerAggregator
}

func GetDealsByAddrAggregator() []byte {
	return dealsByAddrAggregator
}

func GetAllMethodsAggregator() []byte {
	return allMethodsAggregator
}

//func GetAllMethodsForActorAggregator() []byte {
//	return allMethodsForActorAggregator
//}

func GetBlocksForMessageAggregator() []byte {
	return blocksForMessageAggregator
}

//func GetAllActorsForBlockMessageAggregator() []byte {
//	return allActorsForBlockMessageAggregator
//}

//func GetTransferCountForActorAggregator() []byte {
//	return transferCountForActorAggregator
//}

func GetMinedCountForMinersAggregator() []byte {
	return minedCountForMinersAggregator
}

//func GetAllMethodsForFromActorsAggregator() []byte {
//	return allMethodsForFromActorsAggregator
//}

//func GetAllMethodsForToActorsAggregator() []byte {
//	return allMethodsForToActorsAggregator
//}

func GetBoundaryOfDBAggregator() []byte {
	return boundaryOfDBAggregator
}

func GetCountOfBlockMessagesByMethodNameAggregator() []byte {
	return countOfBlockMessagesByMethodNameAggregator
}

func GetCountOfActorMessagesByMethodNameAggregator() []byte {
	return countOfActorMessagesByMethodNameAggregator
}

func GetCountOfTransfersForActor2Aggregator() []byte {
	return countOfTransfersForActor2Aggregator
}

func GetCountOfLargeAmountTransfersAggregator() []byte {
	return countOfLargeAmountTransfersAggregator
}

func GetCountAndMethodNameOfMessagesForBlockHeaderAggregator() []byte {
	return countAndMethodNameOfMessagesForBlockHeaderAggregator
}

func GetMessagesForBlockAggregator() []byte {
	return messagesForBlockAggregator
}

func GetCountOfMessagesForBlockHeaderByMethodNameAggregator() []byte {
	return countOfMessagesForBlockHeaderByMethodNameAggregator
}

func GetBlockHeaderMessagesByMethodNameAggregator() []byte {
	return blockHeaderMessagesByMethodNameAggregator
}

func GetRichListAggregator() []byte {
	return richListAggregator
}

func GetMinedByMinerRangeAggregator() []byte {
	return minedByMinerRangeAggregator
}

func GetCountOfMessageForActorAggregator() []byte {
	return countOfMessageForActorAggregator
}

func GetAllMethodNamesForActor() []byte {
	return allMethodNamesForActor
}

func GetAllBlockMethodNamesAggregator() []byte {
	return allBlockMethodNamesAggregator
}

func GetAllMethodNamesForActorsAggregator() []byte {
	return allMethodNamesForActorsAggregator
}

func GetAllActorsMsgsCountAggregator() []byte {
	return allActorsMsgsCountAggregator
}

func GetAllMinersMinedCountAggregator() []byte {
	return allMinersMinedCountAggregator
}

func GetCountOfBlockMessagesAggregator() []byte {
	return countOfBlockMessagesAggregator
}

func GetTransferMsgsForActorAggregator() []byte {
	return transferMsgsForActorAggregator
}

func GetMessageCidByHashAggregator() []byte {
	return messageCidByHashAggregator
}

func GetEventsRootAggregator() []byte {
	return eventsRootAggregator
}

func GetEvmInitCodeByActorIDAggregator() []byte {
	return getEvmInitCodeByActorIDAggregator
}

func GetHashByMessageCidAggregator() []byte {
	return hashByMessageCidAggregator
}

func GetChildTransfersForMessageAggregator() []byte {
	return childTransfersForMessageAggregator
}

func GetInitCodeForEvmAggregator() []byte {
	return initCodeForEvmAggregator
}

func GetEventsByActorAggregator() []byte {
	return eventsByActorAggregator
}

func GetCountOfEventsForActorAggregator() []byte {
	return countOfEventsForActorAggregator
}

func GetEventsForMessageAggregator() []byte {
	return eventsForMessageAggregator
}

func GetEventsForEpochRangeAggregator() []byte {
	return eventsForEpochRangeAggregator
}

func GetStartDealIDAggregator() []byte {
	return startDealIDAggregator
}

func GetEndDealIDAggregator() []byte {
	return endDealIDAggregator
}

func GetStartEpochForDealAggregator() []byte {
	return startEpochForDealAggregator
}

func GetCountOfDealsByAddrAggregator() []byte {
	return countOfDealsByAddrAggregator
}
