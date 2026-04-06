import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Deploying CourseCertificate contract...");

  const CourseCertificate = await ethers.getContractFactory("CourseCertificate");
  const contract = await CourseCertificate.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`CourseCertificate deployed to: ${address}`);

  // Save ABI and Address to frontend
  const contractsDir = path.join(__dirname, "..", "apps", "web", "src", "lib");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const contractData = {
    address: address,
    abi: JSON.parse(contract.interface.formatJson()),
  };

  const fileContent = `
export const CONTRACT_ADDRESS = "${contractData.address}" as const;
export const CONTRACT_ABI = ${JSON.stringify(contractData.abi, null, 2)} as const;
  `;

  fs.writeFileSync(
    path.join(contractsDir, "contract.ts"),
    fileContent.trim()
  );

  console.log(`Contract data saved to: ${contractsDir}/contract.ts`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
