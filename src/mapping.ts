import { IssueDepositEvent } from '../generated/OctoBay/OctoBay'
import { Issue, IssueDeposit } from '../generated/schema'

export function handleIssueDepositEvent(event: IssueDepositEvent): void {
  let issue = Issue.load(event.params.issueId)
  if (!issue) {
    issue = new Issue(event.params.issueId)
    issue.save()
  }
  let deposit = new IssueDeposit(event.params.depositId)
  deposit.from = event.params.from
  deposit.amount = event.params.amount
  deposit.issue = event.params.issueId
  deposit.save()
}
