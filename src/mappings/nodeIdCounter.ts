import { BigInt } from '@graphprotocol/graph-ts'
import { NodeIdCounter } from '../../generated/schema'

export function getNextNodeId(): String {
  let nodeIdCounter = NodeIdCounter.load('')
  if (!nodeIdCounter) {
    nodeIdCounter = new NodeIdCounter('')
    nodeIdCounter.current = BigInt.fromI32(0)
    nodeIdCounter.save()
  }

  nodeIdCounter.current = nodeIdCounter.current.plus(BigInt.fromI32(1))
  nodeIdCounter.save()

  return nodeIdCounter.current.toString()
}