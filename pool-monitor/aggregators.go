package pool_monitor

import (
	_ "embed"
)

//go:embed account_message_count.js
var accountMessageCountAggregator []byte

//go:embed actor_state.js
var actorStateAggregator []byte

//go:embed actormessages_by_methodname.js
var actormessagesByMethodnameAggregator []byte

//go:embed actormessages_by_methodname_noskip.js
var actormessagesByMethodnameNoskipAggregator []byte

//go:embed actors_for_transfers.js
var actorsForTransfersAggregator []byte

//go:embed address.js
var addressAggregator []byte

//go:embed agg_pre_netfee.js
var aggPreNetfeeAggregator []byte

//go:embed agg_pro_netfee.js
var aggProNetfeeAggregator []byte

//go:embed all_actors_for_blockmessage.js
var allActorsForBlockmessageAggregator []byte

//go:embed all_actors_msgscount.js
var allActorsMsgscountAggregator []byte

//go:embed all_blockMethodNames.js
var allBlockMethodNamesAggregator []byte

//go:embed all_methodNames_for_actor.js
var allMethodNamesForActorAggregator []byte

//go:embed all_methodNames_for_actors.js
var allMethodNamesForActorsAggregator []byte

//go:embed all_methods.js
var allMethodsAggregator []byte

//go:embed all_methods_for_actor.js
var allMethodsForActorAggregator []byte

//go:embed all_methods_for_fromactors.js
var allMethodsForFromactorsAggregator []byte

//go:embed all_methods_for_toactors.js
var allMethodsForToactorsAggregator []byte

//go:embed all_miners_minedCount.js
var allMinersMinedCountAggregator []byte

//go:embed all_msgs_for_actor.js
var allMsgsForActorAggregator []byte

//go:embed all_owners.js
var allOwnersAggregator []byte

//go:embed avg_message_count.js
var avgMessageCountAggregator []byte

//go:embed balance.js
var balanceAggregator []byte

//go:embed batch_trace_for_message.js
var batchTraceForMessageAggregator []byte

//go:embed block.js
var blockAggregator []byte

//go:embed blockheader.js
var blockheaderAggregator []byte

//go:embed blockheader_by_cid.js
var blockheaderByCidAggregator []byte

//go:embed blockheadermessages_by_methodname.js
var blockheadermessagesByMethodnameAggregator []byte

//go:embed blockheaders_by_miner.js
var blockheadersByMinerAggregator []byte

//go:embed blockheaders_by_miner_noskip.js
var blockheadersByMinerNoskipAggregator []byte

//go:embed blockmessages_by_methodname.js
var blockmessagesByMethodnameAggregator []byte

//go:embed blockreward_for_epoch.js
var blockrewardForEpochAggregator []byte

//go:embed blocks_for_message.js
var blocksForMessageAggregator []byte

//go:embed boundary_of_db.js
var boundaryOfDbAggregator []byte

//go:embed burn_fee_all_lb.js
var burnFeeAllLbAggregator []byte

//go:embed burn_monitor.js
var burnMonitorAggregator []byte

//go:embed child_calls_for_message.js
var childCallsForMessageAggregator []byte

//go:embed child_epoch.js
var childEpochAggregator []byte

//go:embed child_transfers_for_message.js
var childTransfersForMessageAggregator []byte

//go:embed claimed_power_for_miner.js
var claimedPowerForMinerAggregator []byte

//go:embed count_and_methodnames_of_messages_for_blockheader.js
var countAndMethodnamesOfMessagesForBlockheaderAggregator []byte

//go:embed count_of_actormessages_by_methodname.js
var countOfActormessagesByMethodnameAggregator []byte

//go:embed count_of_blockmessages.js
var countOfBlockmessagesAggregator []byte

//go:embed count_of_blockmessages_by_methodname.js
var countOfBlockmessagesByMethodnameAggregator []byte

//go:embed count_of_blockmessages_by_methodname2.js
var countOfBlockmessagesByMethodname2Aggregator []byte

//go:embed count_of_deals_by_addr.js
var countOfDealsByAddrAggregator []byte

//go:embed count_of_events_for_actor.js
var countOfEventsForActorAggregator []byte

//go:embed count_of_largeamount_transfers.js
var countOfLargeamountTransfersAggregator []byte

//go:embed count_of_messages_for_actor.js
var countOfMessagesForActorAggregator []byte

//go:embed count_of_messages_for_blockheader_by_methodname.js
var countOfMessagesForBlockheaderByMethodnameAggregator []byte

//go:embed count_of_tipset.js
var countOfTipsetAggregator []byte

//go:embed count_of_transfer_blockreward_for_actor.js
var countOfTransferBlockrewardForActorAggregator []byte

//go:embed count_of_transfer_burn_for_actor.js
var countOfTransferBurnForActorAggregator []byte

//go:embed count_of_transfer_for_actor.js
var countOfTransferForActorAggregator []byte

//go:embed count_of_transfer_receive_for_actor.js
var countOfTransferReceiveForActorAggregator []byte

//go:embed count_of_transfer_send_and_receive_for_actor.js
var countOfTransferSendAndReceiveForActorAggregator []byte

//go:embed count_of_transfer_send_for_actor.js
var countOfTransferSendForActorAggregator []byte

//go:embed count_of_transfers_for_actor2.js
var countOfTransfersForActor2Aggregator []byte

//go:embed create_message.js
var createMessageAggregator []byte

//go:embed createtime.js
var createtimeAggregator []byte

//go:embed deal_by_id.js
var dealByIdAggregator []byte

//go:embed dealid_range.js
var dealidRangeAggregator []byte

//go:embed deals.js
var dealsAggregator []byte

//go:embed deals_by_addr.js
var dealsByAddrAggregator []byte

//go:embed detail_for_deal.js
var detailForDealAggregator []byte

//go:embed events_by_actor.js
var eventsByActorAggregator []byte

//go:embed events_for_epochrange.js
var eventsForEpochrangeAggregator []byte

//go:embed events_for_message.js
var eventsForMessageAggregator []byte

//go:embed eventsroot.js
var eventsrootAggregator []byte

//go:embed final_height.js
var finalHeightAggregator []byte

//go:embed gas_lb.js
var gasLbAggregator []byte

//go:embed gascost_for_sector.js
var gascostForSectorAggregator []byte

//go:embed gasreward_for_miner.js
var gasrewardForMinerAggregator []byte

//go:embed get_evminitcode_by_ActorID.js
var getEvminitcodeByActorIDAggregator []byte

//go:embed hash_by_messagecid.js
var hashByMessagecidAggregator []byte

//go:embed increased_power_state.js
var increasedPowerStateAggregator []byte

//go:embed increased_total_blockreward.js
var increasedTotalBlockrewardAggregator []byte

//go:embed initcode_for_evm.js
var initcodeForEvmAggregator []byte

//go:embed latest_tipset.js
var latestTipsetAggregator []byte

//go:embed messagecid_by_hash.js
var messagecidByHashAggregator []byte

//go:embed messages_for_actor_no_skip.js
var messagesForActorNoSkipAggregator []byte

//go:embed messages_for_block.js
var messagesForBlockAggregator []byte

//go:embed messagses_for_actor.js
var messagsesForActorAggregator []byte

//go:embed mined_by_miner_range.js
var minedByMinerRangeAggregator []byte

//go:embed minedcount_for_miners.js
var minedcountForMinersAggregator []byte

//go:embed miner_blockreward.js
var minerBlockrewardAggregator []byte

//go:embed miner_info.js
var minerInfoAggregator []byte

//go:embed minerfunds_for_owner.js
var minerfundsForOwnerAggregator []byte

//go:embed miners_blockreward.js
var minersBlockrewardAggregator []byte

//go:embed miners_for_owner.js
var minersForOwnerAggregator []byte

//go:embed miners_info.js
var minersInfoAggregator []byte

//go:embed miners_mined.js
var minersMinedAggregator []byte

//go:embed multisig_message.js
var multisigMessageAggregator []byte

//go:embed multisig_state.js
var multisigStateAggregator []byte

//go:embed parent_tipset.js
var parentTipsetAggregator []byte

//go:embed pledge_lb.js
var pledgeLbAggregator []byte

//go:embed power_for_owner.js
var powerForOwnerAggregator []byte

//go:embed pre_netfee_lb.js
var preNetfeeLbAggregator []byte

//go:embed pro_netfee_lb.js
var proNetfeeLbAggregator []byte

//go:embed punishment.js
var punishmentAggregator []byte

//go:embed rank_for_owner.js
var rankForOwnerAggregator []byte

//go:embed richlist.js
var richlistAggregator []byte

//go:embed seal_and_power_lb.js
var sealAndPowerLbAggregator []byte

//go:embed sectors_for_owner.js
var sectorsForOwnerAggregator []byte

//go:embed startepoch_for_deal.js
var startepochForDealAggregator []byte

//go:embed test.js
var testAggregator []byte

//go:embed time_of_trace.js
var timeOfTraceAggregator []byte

//go:embed tipset.js
var tipsetAggregator []byte

//go:embed tipsets_list.js
var tipsetsListAggregator []byte

//go:embed total_block_count.js
var totalBlockCountAggregator []byte

//go:embed trace_for_message.js
var traceForMessageAggregator []byte

//go:embed traces.js
var tracesAggregator []byte

//go:embed transfer_blockreward_for_actor.js
var transferBlockrewardForActorAggregator []byte

//go:embed transfer_burn_for_actor.js
var transferBurnForActorAggregator []byte

//go:embed transfer_message_for_large_amount.js
var transferMessageForLargeAmountAggregator []byte

//go:embed transfer_messages.js
var transferMessagesAggregator []byte

//go:embed transfer_receive_for_actor.js
var transferReceiveForActorAggregator []byte

//go:embed transfer_send_and_receive_for_actor.js
var transferSendAndReceiveForActorAggregator []byte

//go:embed transfer_send_for_actor.js
var transferSendForActorAggregator []byte

//go:embed transfermsgs_for_actor.js
var transfermsgsForActorAggregator []byte

//go:embed wincount_for_miner.js
var wincountForMinerAggregator []byte

//go:embed wincount_zl.js
var wincountZlAggregator []byte

func GetAccountMessageCountAggregator() []byte {
	return accountMessageCountAggregator
}
func GetActorStateAggregator() []byte {
	return actorStateAggregator
}
func GetActormessagesByMethodnameAggregator() []byte {
	return actormessagesByMethodnameAggregator
}
func GetActormessagesByMethodnameNoskipAggregator() []byte {
	return actormessagesByMethodnameNoskipAggregator
}
func GetActorsForTransfersAggregator() []byte {
	return actorsForTransfersAggregator
}
func GetAddressAggregator() []byte {
	return addressAggregator
}
func GetAggPreNetfeeAggregator() []byte {
	return aggPreNetfeeAggregator
}
func GetAggProNetfeeAggregator() []byte {
	return aggProNetfeeAggregator
}
func GetAllActorsForBlockmessageAggregator() []byte {
	return allActorsForBlockmessageAggregator
}
func GetAllActorsMsgscountAggregator() []byte {
	return allActorsMsgscountAggregator
}
func GetAllBlockMethodNamesAggregator() []byte {
	return allBlockMethodNamesAggregator
}
func GetAllMethodNamesForActorAggregator() []byte {
	return allMethodNamesForActorAggregator
}
func GetAllMethodNamesForActorsAggregator() []byte {
	return allMethodNamesForActorsAggregator
}
func GetAllMethodsAggregator() []byte {
	return allMethodsAggregator
}
func GetAllMethodsForActorAggregator() []byte {
	return allMethodsForActorAggregator
}
func GetAllMethodsForFromactorsAggregator() []byte {
	return allMethodsForFromactorsAggregator
}
func GetAllMethodsForToactorsAggregator() []byte {
	return allMethodsForToactorsAggregator
}
func GetAllMinersMinedCountAggregator() []byte {
	return allMinersMinedCountAggregator
}
func GetAllMsgsForActorAggregator() []byte {
	return allMsgsForActorAggregator
}
func GetAllOwnersAggregator() []byte {
	return allOwnersAggregator
}
func GetAvgMessageCountAggregator() []byte {
	return avgMessageCountAggregator
}
func GetBalanceAggregator() []byte {
	return balanceAggregator
}
func GetBatchTraceForMessageAggregator() []byte {
	return batchTraceForMessageAggregator
}
func GetBlockAggregator() []byte {
	return blockAggregator
}
func GetBlockheaderAggregator() []byte {
	return blockheaderAggregator
}
func GetBlockheaderByCidAggregator() []byte {
	return blockheaderByCidAggregator
}
func GetBlockheadermessagesByMethodnameAggregator() []byte {
	return blockheadermessagesByMethodnameAggregator
}
func GetBlockheadersByMinerAggregator() []byte {
	return blockheadersByMinerAggregator
}
func GetBlockheadersByMinerNoskipAggregator() []byte {
	return blockheadersByMinerNoskipAggregator
}
func GetBlockmessagesByMethodnameAggregator() []byte {
	return blockmessagesByMethodnameAggregator
}
func GetBlockrewardForEpochAggregator() []byte {
	return blockrewardForEpochAggregator
}
func GetBlocksForMessageAggregator() []byte {
	return blocksForMessageAggregator
}
func GetBoundaryOfDbAggregator() []byte {
	return boundaryOfDbAggregator
}
func GetBurnFeeAllLbAggregator() []byte {
	return burnFeeAllLbAggregator
}
func GetBurnMonitorAggregator() []byte {
	return burnMonitorAggregator
}
func GetChildCallsForMessageAggregator() []byte {
	return childCallsForMessageAggregator
}
func GetChildEpochAggregator() []byte {
	return childEpochAggregator
}
func GetChildTransfersForMessageAggregator() []byte {
	return childTransfersForMessageAggregator
}
func GetClaimedPowerForMinerAggregator() []byte {
	return claimedPowerForMinerAggregator
}
func GetCountAndMethodnamesOfMessagesForBlockheaderAggregator() []byte {
	return countAndMethodnamesOfMessagesForBlockheaderAggregator
}
func GetCountOfActormessagesByMethodnameAggregator() []byte {
	return countOfActormessagesByMethodnameAggregator
}
func GetCountOfBlockmessagesAggregator() []byte {
	return countOfBlockmessagesAggregator
}
func GetCountOfBlockmessagesByMethodnameAggregator() []byte {
	return countOfBlockmessagesByMethodnameAggregator
}
func GetCountOfBlockmessagesByMethodname2Aggregator() []byte {
	return countOfBlockmessagesByMethodname2Aggregator
}
func GetCountOfDealsByAddrAggregator() []byte {
	return countOfDealsByAddrAggregator
}
func GetCountOfEventsForActorAggregator() []byte {
	return countOfEventsForActorAggregator
}
func GetCountOfLargeamountTransfersAggregator() []byte {
	return countOfLargeamountTransfersAggregator
}
func GetCountOfMessagesForActorAggregator() []byte {
	return countOfMessagesForActorAggregator
}
func GetCountOfMessagesForBlockheaderByMethodnameAggregator() []byte {
	return countOfMessagesForBlockheaderByMethodnameAggregator
}
func GetCountOfTipsetAggregator() []byte {
	return countOfTipsetAggregator
}
func GetCountOfTransferBlockrewardForActorAggregator() []byte {
	return countOfTransferBlockrewardForActorAggregator
}
func GetCountOfTransferBurnForActorAggregator() []byte {
	return countOfTransferBurnForActorAggregator
}
func GetCountOfTransferForActorAggregator() []byte {
	return countOfTransferForActorAggregator
}
func GetCountOfTransferReceiveForActorAggregator() []byte {
	return countOfTransferReceiveForActorAggregator
}
func GetCountOfTransferSendAndReceiveForActorAggregator() []byte {
	return countOfTransferSendAndReceiveForActorAggregator
}
func GetCountOfTransferSendForActorAggregator() []byte {
	return countOfTransferSendForActorAggregator
}
func GetCountOfTransfersForActor2Aggregator() []byte {
	return countOfTransfersForActor2Aggregator
}
func GetCreateMessageAggregator() []byte {
	return createMessageAggregator
}
func GetCreatetimeAggregator() []byte {
	return createtimeAggregator
}
func GetDealByIdAggregator() []byte {
	return dealByIdAggregator
}
func GetDealidRangeAggregator() []byte {
	return dealidRangeAggregator
}
func GetDealsAggregator() []byte {
	return dealsAggregator
}
func GetDealsByAddrAggregator() []byte {
	return dealsByAddrAggregator
}
func GetDetailForDealAggregator() []byte {
	return detailForDealAggregator
}
func GetEventsByActorAggregator() []byte {
	return eventsByActorAggregator
}
func GetEventsForEpochrangeAggregator() []byte {
	return eventsForEpochrangeAggregator
}
func GetEventsForMessageAggregator() []byte {
	return eventsForMessageAggregator
}
func GetEventsrootAggregator() []byte {
	return eventsrootAggregator
}
func GetFinalHeightAggregator() []byte {
	return finalHeightAggregator
}
func GetGasLbAggregator() []byte {
	return gasLbAggregator
}
func GetGascostForSectorAggregator() []byte {
	return gascostForSectorAggregator
}
func GetGasrewardForMinerAggregator() []byte {
	return gasrewardForMinerAggregator
}
func GetGetEvminitcodeByActorIDAggregator() []byte {
	return getEvminitcodeByActorIDAggregator
}
func GetHashByMessagecidAggregator() []byte {
	return hashByMessagecidAggregator
}
func GetIncreasedPowerStateAggregator() []byte {
	return increasedPowerStateAggregator
}
func GetIncreasedTotalBlockrewardAggregator() []byte {
	return increasedTotalBlockrewardAggregator
}
func GetInitcodeForEvmAggregator() []byte {
	return initcodeForEvmAggregator
}
func GetLatestTipsetAggregator() []byte {
	return latestTipsetAggregator
}
func GetMessagecidByHashAggregator() []byte {
	return messagecidByHashAggregator
}
func GetMessagesForActorNoSkipAggregator() []byte {
	return messagesForActorNoSkipAggregator
}
func GetMessagesForBlockAggregator() []byte {
	return messagesForBlockAggregator
}
func GetMessagsesForActorAggregator() []byte {
	return messagsesForActorAggregator
}
func GetMinedByMinerRangeAggregator() []byte {
	return minedByMinerRangeAggregator
}
func GetMinedcountForMinersAggregator() []byte {
	return minedcountForMinersAggregator
}
func GetMinerBlockrewardAggregator() []byte {
	return minerBlockrewardAggregator
}
func GetMinerInfoAggregator() []byte {
	return minerInfoAggregator
}
func GetMinerfundsForOwnerAggregator() []byte {
	return minerfundsForOwnerAggregator
}
func GetMinersBlockrewardAggregator() []byte {
	return minersBlockrewardAggregator
}
func GetMinersForOwnerAggregator() []byte {
	return minersForOwnerAggregator
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
func GetParentTipsetAggregator() []byte {
	return parentTipsetAggregator
}
func GetPledgeLbAggregator() []byte {
	return pledgeLbAggregator
}
func GetPowerForOwnerAggregator() []byte {
	return powerForOwnerAggregator
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
func GetRankForOwnerAggregator() []byte {
	return rankForOwnerAggregator
}
func GetRichlistAggregator() []byte {
	return richlistAggregator
}
func GetSealAndPowerLbAggregator() []byte {
	return sealAndPowerLbAggregator
}
func GetSectorsForOwnerAggregator() []byte {
	return sectorsForOwnerAggregator
}
func GetStartepochForDealAggregator() []byte {
	return startepochForDealAggregator
}
func GetTestAggregator() []byte {
	return testAggregator
}
func GetTimeOfTraceAggregator() []byte {
	return timeOfTraceAggregator
}
func GetTipsetAggregator() []byte {
	return tipsetAggregator
}
func GetTipsetsListAggregator() []byte {
	return tipsetsListAggregator
}
func GetTotalBlockCountAggregator() []byte {
	return totalBlockCountAggregator
}
func GetTraceForMessageAggregator() []byte {
	return traceForMessageAggregator
}
func GetTracesAggregator() []byte {
	return tracesAggregator
}
func GetTransferBlockrewardForActorAggregator() []byte {
	return transferBlockrewardForActorAggregator
}
func GetTransferBurnForActorAggregator() []byte {
	return transferBurnForActorAggregator
}
func GetTransferMessageForLargeAmountAggregator() []byte {
	return transferMessageForLargeAmountAggregator
}
func GetTransferMessagesAggregator() []byte {
	return transferMessagesAggregator
}
func GetTransferReceiveForActorAggregator() []byte {
	return transferReceiveForActorAggregator
}
func GetTransferSendAndReceiveForActorAggregator() []byte {
	return transferSendAndReceiveForActorAggregator
}
func GetTransferSendForActorAggregator() []byte {
	return transferSendForActorAggregator
}
func GetTransfermsgsForActorAggregator() []byte {
	return transfermsgsForActorAggregator
}
func GetWincountForMinerAggregator() []byte {
	return wincountForMinerAggregator
}
func GetWincountZlAggregator() []byte {
	return wincountZlAggregator
}
