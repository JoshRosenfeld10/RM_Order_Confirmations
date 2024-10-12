const config = require("../modules/config");

const constants = {
  local: false,
  gcpProject: "rm-order-management",
  smartsheetToken: config.smartsheetToken,
  pdfMonkeyToken: config.pdfMonkeyToken,
  resendToken: config.resendToken,
};

module.exports = constants;
