/* require("@nomicfoundation/hardhat-toolbox");



module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  }
}; */


require("@nomicfoundation/hardhat-toolbox");

//require("./tasks/faucet");

const ALCHEMY_API_KEY = "krgxHPZWyfpsjisZbwv9vq0m6BhkmCzp";
const GOERLI_PRIVATE_KEY = "2a8d4823467fe9e251dc11cf9f82ae16429bf733b41a749c3ef6c8b5e32df47f";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  }
};