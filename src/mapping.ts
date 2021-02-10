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
  const octobay = OctoBay.bind(event.address)
  const newOracleOnChain = octobay.oracles(event.params.oracle)

  // add new oracle
  const newOracle = new Oracle(event.params.oracle)
  newOracle.name = event.params.name
  newOracle.save()

  // load jobs from chain and add them
  newOracleOnChain.jobs.forEach(job => {
    const newJob = OracleJob(job.id)
    newJob.fee = job.fee
    newJob.oracle = newOracle
    newJob.save()
  })
}

export function handleUserAddedEvent(event: UserAddedEvent): void {
  const user = new User(event.params.id)
  user.name = event.params.name
  user.ethAddress = event.params.ethAddress
  user.status = event.params.status
  user.save()
}
