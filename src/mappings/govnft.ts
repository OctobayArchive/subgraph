import { MintNFTForGovTokenEvent, Transfer } from '../../generated/OctobayGovNFT/OctobayGovNFT'
import { GovernancePermissionNFT } from '../../generated/schema'

export function handleMintNFTForGovTokenEvent(event: MintNFTForGovTokenEvent): void {
  let nft = new GovernancePermissionNFT(event.params.tokenId.toString())
  nft.ownerAddress = event.params.to
  nft.permissions = ['MINT', 'TRANSFER', 'SET_ISSUE_GOVTOKEN', 'CREATE_PROPOSAL']
  nft.department = event.params.govTokenAddress.toHexString()
  nft.save()
}

export function handleTransfer(event: Transfer): void {
  let nft = GovernancePermissionNFT.load(event.params.tokenId.toString())
  if (nft) {
    nft.ownerAddress = event.params.to
    nft.save()
  }
}