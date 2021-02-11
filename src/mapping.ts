import { OctoBay, IssueDepositEvent, OracleAddedEvent, UserAddedEvent } from '../generated/OctoBay/OctoBay'
import { Issue, IssueDeposit, Oracle, OracleJob, User } from '../generated/schema'

export function handleIssueDepositEvent(event: IssueDepositEvent): void {
  let issue = Issue.load(event.params.issueId)
  if (!issue) {
    issue = new Issue(event.params.issueId)
    issue.save()
  }
  let deposit = new IssueDeposit(event.params.depositId.toString())
  deposit.from = event.params.from
  deposit.amount = event.params.amount
  deposit.issue = event.params.issueId
  deposit.save()
}

export function handleOracleAddedEvent(event: OracleAddedEvent): void {
  let octobay = OctoBay.bind(event.address)

  // add new oracle
  let newOracle = new Oracle(event.params.oracle.toString())
  newOracle.name = event.params.name
  newOracle.save()

  // add jobs from chain
  let registerJobOnChain = octobay.getOracleJob(event.params.oracle, 0)
  let registerJob = new OracleJob(registerJobOnChain.value0.toString())
  registerJob.name = 'register'
  registerJob.fee = registerJobOnChain.value1
  registerJob.oracle = newOracle.id
  registerJob.save()
}

export function handleUserAddedEvent(event: UserAddedEvent): void {
  let user = new User(event.params.id.toString())
  user.name = event.params.name
  user.ethAddress = event.params.ethAddress
  user.status = event.params.status
  user.save()
}
