const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Polling contract - TESTNET", function () {

    const ownerAddress = '0x932f6Bfd7CE286CcFd627b1549E0Ff97CB1151AB';
    const candAddress = '0xb5aEEA0f8f05f6857467eaF75E49Fcf2795a84ba';
    const contAddress = '0xf5704aBAAE5C8C4a4c945c73f4e781e15FCC3025';

    async function attachContractFixiture() {
        // Set up an ethers obj representing our deployed contract instance
        const Polling = await ethers.getContractFactory('MyPolls');
        const pollingObj = await Polling.attach(contAddress);
        return pollingObj;
    }

    describe("Verifying Deployment", function () {

        it("Should set the right owner", async function () {
             pollingObj = await attachContractFixiture();
            expect(await pollingObj.owner()).to.equal(ownerAddress);
        });

        it("Should set vots count to 0", async function () {
            pollingObj = await attachContractFixiture();
            expect(await pollingObj.getVotCount()).to.equal(1);
        });

        it("Should be in a paused state at first", async function () {
            pollingObj = await attachContractFixiture();
            expect(await pollingObj.paused()).to.equal(false);
        });
    });

});
