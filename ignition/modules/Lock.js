const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FileSharing", (m) => {
  const fileSharing = m.contract("FileSharingDApp");
  // return contract address
  return { fileSharing };
});
