const { Resend } = require("resend"),
  constants = require("../constants/constants"),
  smartsheet = require("../modules/smartsheet"),
  apiTest = require("../constants/apiTest");

const resend = new Resend(constants.resendToken);

const sendEmail = async ({ orderId, rowId, filename, fileBuffer }) => {
  const sheetId = apiTest.id;

  const { cells: rowCells } = await smartsheet.getRow(sheetId, rowId);
  const toEmails = rowCells[apiTest.emailColumnIndex].displayValue
    .replace(/ /g, "")
    .split(",");

  const { error } = await resend.emails.send({
    from: "LG&P <noreply@lginstore.com>",
    to: toEmails,
    subject: `Confirmation - Order ${orderId}`,
    html: "<strong>Thank You For Your Order!</strong>",
    attachments: [
      {
        filename,
        content: fileBuffer,
      },
    ],
  });

  if (error) {
    return console.error({ error });
  }

  console.log("Email sent successfully.");
};

module.exports = sendEmail;
