const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  smartsheetToken: process.env.SMARTSHEET_ACCESS_TOKEN,
  port: process.env.PORT,
  pdfMonkeyToken: process.env.PDFMONKEY_ACCESS_TOKEN,
  resendToken: process.env.RESEND_ACCESS_TOKEN,
};
