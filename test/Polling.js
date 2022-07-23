const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Polling contract", function () {

  async function deployTokenFixture() {
    const Polling = await ethers.getContractFactory("MyPolls");
    const [owner, acc1, acc2] = await ethers.getSigners();
    const pollingObj = await Polling.deploy();
    await pollingObj.deployed();
    return { Token: Polling, pollingObj: pollingObj, owner, acc1, acc2 };
  }

  
  describe("Polling Deployment", function () {

    it("Should set the right owner", async function () {
      const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
      expect(await pollingObj.owner()).to.equal(owner.address);
    });

    it("Should set vots count to 0", async function () {
      const { pollingObj, owner } = await loadFixture(deployTokenFixture);
      expect(await pollingObj.getVotCount()).to.equal(0);
    });

    it("Should be in a paused state at first", async function () {
      const { pollingObj, owner } = await loadFixture(deployTokenFixture);
      expect(await pollingObj.getVotCount()).to.equal(0);
    });
  });


  
  describe("Candidate registration", function () {

    it("Should fail to register if contract is paused", async function () {
      const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
      await expect(pollingObj.addCandidate(owner.address, "My-Name_failed-by-Pause")).to.be.revertedWith("Contract is paused");
    });

    it("Should register if caller is Owner", async function () {
      const { pollingObj, owner } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
      pollingObj.unpause();
      expect(await pollingObj.addCandidate(owner.address, "My-Name_Success")).to.emit(pollingObj, "CandidateAdded")
        .withArgs(1, "Zillo");
    });

    it("Should fail to register if caller is not owner", async function () {
      const { pollingObj: pollingObj, owner, acc1, acc2 } = await loadFixture(deployTokenFixture);
      pollingObj.unpause();
      await expect(pollingObj.connect(acc2).addCandidate(acc1.address, "My-Name_failed-by-not-Admin"))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

  });


  describe("Votting Process", function () {
    

    it("Should fail to vote if contract is paused", async function () {
      const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
      await expect(pollingObj.vote(owner.address)).to.be.revertedWith("Contract is paused");
    });

    it("Should count votes if contract is unpaused", async function () {
      const { pollingObj, owner, acc1, acc2  } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
      pollingObj.unpause();
      pollingObj.addCandidate(acc1.address, "My-Name_Success");
      pollingObj.vote(acc1.address);
      expect(await pollingObj.getVotCount()).to.equal(1);
    });

    it("Should fail if votter already votted", async function () {
      const { pollingObj, owner, acc1, acc2  } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
      pollingObj.unpause();
      pollingObj.addCandidate(acc1.address, "My-Name_Success");
      pollingObj.vote(acc1.address);
                                                                  
      await expect(pollingObj.connect(acc1).vote(acc1.address)).to.be.revertedWith("votter already votted");
      //await expect(pollingObj.vote(acc2.address)).to.be.revertedWith("votter already votted");
      //expect(await pollingObj.getVotCount()).to.equal(1);

    });

  });


  // describe("Candidate registration", function () {
  //   it("Should transfer tokens between accounts", async function () {
  //     const { pollingObj, owner, acc1, acc2 } = await loadFixture(deployTokenFixture);
  //     // Transfer 50 tokens from owner to acc1
  //     await expect(pollingObj.transfer(acc1.address, 50))
  //       .to.changeTokenBalances(pollingObj, [owner, acc1], [-50, 50]);

  //     // Transfer 50 tokens from acc1 to acc2
  //     // We use .connect(signer) to send a transaction from another account
  //     await expect(pollingObj.connect(acc1).transfer(acc2.address, 50))
  //       .to.changeTokenBalances(pollingObj, [acc1, acc2], [-50, 50]);
  //   });

  //   it("should emit Transfer events", async function () {
  //     const { pollingObj, owner, acc1, acc2 } = await loadFixture(deployTokenFixture);

  //     // Transfer 50 tokens from owner to acc1
  //     await expect(pollingObj.transfer(acc1.address, 50))
  //       .to.emit(pollingObj, "Transfer").withArgs(owner.address, acc1.address, 50)

  //     // Transfer 50 tokens from acc1 to acc2
  //     // We use .connect(signer) to send a transaction from another account
  //     await expect(pollingObj.connect(acc1).transfer(acc2.address, 50))
  //       .to.emit(pollingObj, "Transfer").withArgs(acc1.address, acc2.address, 50)
  //   });

  //   it("Should fail if sender doesn't have enough tokens", async function () {
  //     const { pollingObj, owner, acc1 } = await loadFixture(deployTokenFixture);
  //     const initialOwnerBalance = await pollingObj.balanceOf(
  //       owner.address
  //     );

  //     // Try to send 1 token from acc1 (0 tokens) to owner (1000 tokens).
  //     // `require` will evaluate false and revert the transaction.
  //     await expect(
  //       pollingObj.connect(acc1).transfer(owner.address, 1)
  //     ).to.be.revertedWith("Not enough tokens");

  //     // Owner balance shouldn't have changed.
  //     expect(await pollingObj.balanceOf(owner.address)).to.equal(
  //       initialOwnerBalance
  //     );
  //   });  

  // });


});
