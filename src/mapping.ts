import { IssueDepositEvent } from '../generated/OctoBay/OctoBay'
import { Issue } from '../generated/schema'

export function handleNewIssueDeposit(event: IssueDepositEvent): void {
  let issue = new Issue(event.params.issueId)
  issue.depositSize = event.params.amount
  issue.save()
}
