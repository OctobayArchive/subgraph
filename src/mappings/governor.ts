import { DepartmentCreatedEvent, ProposalCreatedEvent, VoteCastEvent } from '../../generated/OctobayGovernor/OctobayGovernor'
import { GovernanceDepartment, GovernanceProposal, GovernanceProposalVote } from '../../generated/schema'

export function handleDepartmentCreatedEvent(event: DepartmentCreatedEvent): void {
  let department = new GovernanceDepartment(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  department.projectId = event.params.projectId
  department.tokenAddress = event.params.tokenAddress
  department.name = event.params.name
  department.symbol = event.params.symbol
  department.minQuorum = event.params.minQuorum
  department.requiredSharesToCreateProposals = event.params.requiredSharesToCreateProposals
  department.save()
}

export function handleProposalCreatedEvent(event: ProposalCreatedEvent): void {
  let proposal = new GovernanceProposal(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  proposal.quorum = event.params.quorum
  proposal.discussionId = event.params.discussionId
  proposal.startDate = event.params.startDate
  proposal.endDate = event.params.endDate
  proposal.department = event.params.department
  proposal.save()
}

export function handleVoteCastEvent(event: VoteCastEvent): void {
  let vote = new GovernanceProposalVote(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  vote.holder = event.params.voter
  vote.percentage = event.params.vote
  vote.proposal = event.params.proposalId
  vote.save()
}