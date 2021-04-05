import { store } from '@graphprotocol/graph-ts'
import { OracleStorage, OracleAddedEvent, OracleRemovedEvent, OracleJobRemovedEvent } from '../../generated/OracleStorage/OracleStorage'
import { Oracle, OracleJob } from '../../generated/schema'

export function handleOracleAddedEvent(event: OracleAddedEvent): void {
  let oracleStorage = OracleStorage.bind(event.address)

  // add new oracle
  let newOracle = new Oracle(event.params.oracle.toHexString())
  newOracle.ethAddress = event.params.oracle
  newOracle.name = event.params.name
  newOracle.save()

  // add jobs from chain
  let registerJobOnChain = oracleStorage.getOracleJob(event.params.oracle, 'register')
  let registerJob = new OracleJob(registerJobOnChain.value0.toString())
  registerJob.name = 'register'
  registerJob.fee = registerJobOnChain.value1
  registerJob.oracle = newOracle.id
  registerJob.save()
}

export function handleOracleRemovedEvent(event: OracleRemovedEvent): void {
  let oracle = Oracle.load(event.params.oracle.toHexString())
  if (oracle) {
    store.remove('Oracle', oracle.id)
  }
}

export function handleOracleJobRemovedEvent(event: OracleJobRemovedEvent): void {
  let oracleJob = Oracle.load(event.params.id.toString())
  if (oracleJob) {
    store.remove('OracleJob', oracleJob.id)
  }
}