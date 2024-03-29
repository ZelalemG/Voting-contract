// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const PollsContract = await ethers.getContractFactory("MyPolls");
  const contractObj = await PollsContract.deploy();
  await contractObj.deployed();

  console.log("Contract address:", contractObj.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(contractObj);
}

function saveFrontendFiles(_contractObj) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ MyPolls: _contractObj.address }, undefined, 2)
  );

  const PollsArtifact = artifacts.readArtifactSync("MyPolls");

  fs.writeFileSync(
    path.join(contractsDir, "MyPolls.json"),
    JSON.stringify(PollsArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
