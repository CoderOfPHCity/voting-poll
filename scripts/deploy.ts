import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Votting");

  await lock.waitForDeployment();


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
