import {loadFixture,} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Votting", function () {

  async function deployOneYearLockFixture() {


    const [owner, otherAccount] = await ethers.getSigners();

    const Vote = await ethers.getContractFactory("Votting");
    const vote = await Vote.deploy();



    const TITLE = "title"
    const ID = ethers.parseEther("1")

    const ZeroAddress = "0x0000000000000000000000000000000000000000"

    const DESC = "This is the description"


    return { vote, owner, otherAccount, TITLE, ID, DESC, ZeroAddress };
    
  }



  describe("createpoll", function () {
    describe("check if pool is created", function () {
      it("Should check if poll is created", async function () {
        const { vote, owner, TITLE, ID,DESC} = await loadFixture(deployOneYearLockFixture);
        const tx = await vote.connect(owner).createPool(TITLE, ID, DESC)

        await tx.wait()

         expect((await vote.getPolls()).length).to.equal(1);
      });

      it("should check if pool exist", async () => {
        const { vote, owner, TITLE, ID,DESC} = await loadFixture(deployOneYearLockFixture);
        const tx1 = await vote.connect(owner).createPool(TITLE, ID, DESC)
        await tx1.wait()

      expect( await vote.pollExists(0)).to.equal(true)

        
      })

      it("Should check if a single pool exist",async () => {
        const { vote, owner, TITLE, ID,DESC} = await loadFixture(deployOneYearLockFixture);
        const tx1 = await vote.connect(owner).createPool(TITLE, ID, DESC)
        await tx1.wait()
        await expect( vote.getSinglePoll(0)).to.exist

        
      })

      it("Should check if candidate has registered",async () => {
        const { vote, owner, TITLE, ID,DESC} = await loadFixture(deployOneYearLockFixture);

        await (expect (await vote.candidatesToBeVoted(0))).to.exist

        
      })

      it("should check for address", async () => {
        const { vote, owner, ZeroAddress } = await loadFixture(deployOneYearLockFixture)
        expect( await vote.connect(owner).candidatesToBeVoted(0)).to.not.eq(ZeroAddress)

        
      })

      it("should check if address is emppty",async () => {
          const { vote, owner, TITLE, ID,DESC} = await loadFixture(deployOneYearLockFixture);
        // await vote.connect(owner).createPool(TITLE, ID, DESC)
    



         await vote.connect(owner).candidatesToBeVoted(1)

        const txx = (await vote.connect(owner).getSinglePoll(1)).candidates.length


      await  expect(txx).to.equal(1)
        
      })

    


    });

    // describe("Events", function () {
    //   it("Should emit an event on withdrawals", async function () {
    //     const { lock, unlockTime, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw())
    //       .to.emit(lock, "Withdrawal")
    //       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //   });
    // });

  });
});
