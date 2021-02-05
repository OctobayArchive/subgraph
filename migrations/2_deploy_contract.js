const OctoBay = artifacts.require('./OctoBay.sol')

module.exports = async function(deployer) {
  await deployer.deploy(OctoBay)
}
