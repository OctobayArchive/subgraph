import { OracleStorage, OracleAddedEvent } from '../../generated/OracleStorage/OracleStorage'
import { Oracle, OracleJob } from '../../generated/schema'
import { getNextNodeId } from './nodeIdCounter'

export function handleOracleAddedEvent(event: OracleAddedEvent): void {
  let oracleStorage = OracleStorage.bind(event.address)

  // add new oracle
  let newOracle = new Oracle(getNextNodeId())
  newOracle.ethAddress = event.params.oracle
  newOracle.name = event.params.name
  newOracle.save()

  // add jobs from chain
  let registerJobOnChain = oracleStorage.getOracleJob(event.params.oracle, 'register')
  let registerJob = new OracleJob(getNextNodeId())
  registerJob.name = 'register'
  registerJob.fee = registerJobOnChain.value1
  registerJob.oracle = newOracle.id
  registerJob.save()
}