import { MintTokenForProjectEvent } from '../../generated/OctobayGovNFT/OctobayGovNFT'
import { GovernancePermissionNFT } from '../../generated/schema'

export function handleMintTokenForProjectEvent(event: MintTokenForProjectEvent): void {
  let nft = new GovernancePermissionNFT(event.params.tokenId.toString())
  nft.ownerAddress = event.params.to
  nft.permissions = ['MINT', 'TRANSFER', 'SET_ISSUE_GOVTOKEN', 'CREATE_PROPOSAL']
  nft.department = event.params.govTokenAddress.toHexString()
  nft.save()
}