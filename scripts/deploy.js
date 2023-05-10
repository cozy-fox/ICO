const { ethers } = require("hardhat");
const path = require("path");
async function main() {
  const [deployer] = await ethers.getSigners();
  // console.log("Deploying contracts with the account:", deployer.address);
  const ICOToken = await ethers.getContractFactory("ICOToken");
  const token = await ICOToken.deploy();
  //console.log("Token address:", token.address);
  const Token = await ethers.getContractFactory("Token");
  const tokenContract = await Token.deploy(
    token.address,
    100,
    1000,
    10,
    50,
    Math.floor(new Date('2023-05-09T23:28:00') / 1000),
    Math.floor(new Date('2023-05-14T09:00:00') / 1000)
  );
  await token.mint(tokenContract.address,50000);
  saveFrontendFiles(tokenContract,token);
}
function saveFrontendFiles(token,icoToken) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );

  //////////
  fs.writeFileSync(
    path.join(contractsDir, "ICOcontract-address.json"),
    JSON.stringify({ Token: icoToken.address }, undefined, 2)
  );

  const ICOTokenArtifact = artifacts.readArtifactSync("ICOToken");

  fs.writeFileSync(
    path.join(contractsDir, "ICOToken.json"),
    JSON.stringify(ICOTokenArtifact, null, 2)
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });