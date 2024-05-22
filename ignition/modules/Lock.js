const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FileSharing", (m) => {
  const vrfCoordinator = "0x6168499c0fff9001a63ab8631b0c8e8331a3c850";
  const linkToken = "0xa36085f69e2889c224210f603d836748e7dc0088";
  const keyHash =
    "0x6c3699283bda56ad74f6b855546325b68d482e983852a9f5d4a7bc9b5c933d64";
  const fee = ethers.utils.parseEther("0.1");

  const fileSharing = m.contract("FileSharingDApp", [
    vrfCoordinator,
    linkToken,
    keyHash,
    fee,
  ]);

  return { fileSharing };
});
