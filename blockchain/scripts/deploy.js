import hre from "hardhat";

async function main() {

  const EquipmentPassport = await hre.ethers.getContractFactory("EquipmentPassport");

  const contract = await EquipmentPassport.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});