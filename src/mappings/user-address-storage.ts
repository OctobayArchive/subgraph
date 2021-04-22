import { UserAddressAddedEvent } from '../../generated/UserAddressStorage/UserAddressStorage'
import { User, UserAddress } from '../../generated/schema'
// @ts-ignore
import { getNextNodeId } from './nodeIdCounter'

export function handleUserAddressAddedEvent(event: UserAddressAddedEvent): void {
  let user = User.load(event.params.userId)
  if (!user) {
    user = new User(event.params.userId)
    user.save()
  }
  let userAddress = new UserAddress(event.params.ethAddress.toHexString())
  userAddress.user = event.params.userId
  userAddress.name = event.params.addressName.toString()
  userAddress.address = event.params.ethAddress
  userAddress.save()
}
