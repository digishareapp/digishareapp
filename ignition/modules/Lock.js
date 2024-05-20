const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FileSharing", (m) => {
  const fileSharing = m.contract("FileSharingDApp");

  return { fileSharing };
});
