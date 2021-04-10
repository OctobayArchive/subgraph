import { BigInt } from '@graphprotocol/graph-ts'
import { IssueDepositEvent, AwardGovernanceTokensEvent } from '../../generated/Octobay/Octobay'
import { Issue, IssueDeposit, GovernanceTokenHolder } from '../../generated/schema'
// @ts-ignore
import { getNextNodeId } from './nodeIdCounter'

export function handleIssueDepositEvent(event: IssueDepositEvent): void {
  let issue = Issue.load(event.params.issueId)
  if (!issue) {
    issue = new Issue(event.params.issueId)
    issue.save()
  }
  let deposit = new IssueDeposit(getNextNodeId())
  deposit.from = event.params.from
  deposit.amount = event.params.amount
  deposit.issue = event.params.issueId
  deposit.save()
}

export function handleAwardGovernanceTokensEvent(event: AwardGovernanceTokensEvent): void {
  let holder = GovernanceTokenHolder.load(event.params.recipient.toHexString())
  if (!holder) {
    holder = new GovernanceTokenHolder(event.params.recipient.toHexString())
    holder.ethAddress = event.params.recipient
    holder.department = event.params.tokenAddr.toHexString()
    holder.save()
  }

  holder.balance = holder.balance.plus(event.params.amount)
  holder.save()
}