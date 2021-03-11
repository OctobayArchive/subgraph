import { OracleStorage, OracleAddedEvent } from '../../generated/OracleStorage/OracleStorage'
import { Oracle, OracleJob } from '../../generated/schema'

export function handleOracleAddedEvent(event: OracleAddedEvent): void {
  let oracleStorage = OracleStorage.bind(event.address)

  // add new oracle
  let newOracle = new Oracle(event.params.oracle.toString())
  newOracle.name = event.params.name
  newOracle.save()

  // add jobs from chain
  let registerJobOnChain = oracleStorage.getOracleJob(event.params.oracle, 0)
  let registerJob = new OracleJob(registerJobOnChain.value0.toString())
  registerJob.name = 'register'
  registerJob.fee = registerJobOnChain.value1
  registerJob.oracle = newOracle.id
  registerJob.save()
}