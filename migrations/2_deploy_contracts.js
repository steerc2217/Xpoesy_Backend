const Xpoesy = artifacts.require("Xpoesys");

module.exports = async function(deployer) {
  await deployer.deploy(Xpoesy);
};
