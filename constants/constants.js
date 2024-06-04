const config = require("../modules/config");

const constants = {
  local: true,
  gcpProject: "rm-order-management",
  smartsheetToken: config.smartsheetToken,
  pdfMonkeyToken: config.pdfMonkeyToken,
};

module.exports = constants;
