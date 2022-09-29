// const { expect } = require("chai");
// const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// describe("Polling contract", function () {

//   async function deployTokenFixture() {
//     const Polling = await ethers.getContractFactory("MyPolls");
//     const [owner, acc1, acc2] = await ethers.getSigners();
//     const pollingObj = await Polling.deploy();
//     await pollingObj.deployed();
//     return { Token: Polling, pollingObj: pollingObj, owner, acc1, acc2 };
//   }

  
//   describe("Polling Deployment", function () {

//     it("Should set the right owner", async function () {
//       const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
//       expect(await pollingObj.owner()).to.equal(owner.address);
//     });

//     it("Should set vots count to 0", async function () {
//       const { pollingObj, owner } = await loadFixture(deployTokenFixture);
//       expect(await pollingObj.getVotCount()).to.equal(0);
//     });

//     it("Should be in a paused state at first", async function () {
//       const { pollingObj, owner } = await loadFixture(deployTokenFixture);
//       expect(await pollingObj.paused()).to.equal(true);
//     });
//   });


  
//   describe("Candidate registration", function () {

//     it("Should fail to register if contract is paused", async function () {
//       const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
//       await expect(pollingObj.addCandidate(owner.address, "My-Name_failed-by-Pause")).to.be.revertedWith("Contract is paused");
//     });

//     it("Should register if caller is Owner", async function () {
//       const { pollingObj, owner } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
//       pollingObj.unpause();
//       expect(await pollingObj.addCandidate(owner.address, "My-Name_Success")).to.emit(pollingObj, "CandidateAdded")
//         .withArgs(1, "Zillo");
//     });

//     it("Should fail to register if caller is not owner", async function () {
//       const { pollingObj: pollingObj, owner, acc1, acc2 } = await loadFixture(deployTokenFixture);
//       pollingObj.unpause();
//       await expect(pollingObj.connect(acc2).addCandidate(acc1.address, "My-Name_failed-by-not-Admin"))
//         .to.be.revertedWith("Ownable: caller is not the owner");
//     });

//   });


//   describe("Votting Process", function () {
    

//     it("Should fail to vote if contract is paused", async function () {
//       const { pollingObj: pollingObj, owner } = await loadFixture(deployTokenFixture);
//       await expect(pollingObj.vote(owner.address)).to.be.revertedWith("Contract is paused");
//     });

//     it("Should count votes if contract is unpaused", async function () {
//       const { pollingObj, owner, acc1, acc2  } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
//       pollingObj.unpause();
//       pollingObj.addCandidate(acc1.address, "My-Name_Success");
//       pollingObj.vote(acc1.address);
//       expect(await pollingObj.getVotCount()).to.equal(1);
//     });

//     it("Should fail if votter already votted", async function () {
//       const { pollingObj, owner, acc1, acc2  } = await loadFixture(deployTokenFixture); //(candidatesArray.length, name)
//       pollingObj.unpause();
//       pollingObj.addCandidate(acc1.address, "My-Name_Success");
//       pollingObj.vote(acc1.address);
                                                                  
//       //await expect(pollingObj.connect(acc1).vote(acc1.address)).to.be.revertedWith("votter already votted");
//       await expect(pollingObj.vote(acc1.address)).to.be.revertedWith("votter already votted");
//       //expect(await pollingObj.getVotCount()).to.equal(1);

//     });

//   });

// });
