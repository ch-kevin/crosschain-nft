require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

module.exports = {
  solidity: "0.8.27",
  namedAccounts: {
    firstAccounts: {
      default: 0,
    }
  }
};
