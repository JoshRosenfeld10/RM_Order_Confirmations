const smtp2Goapi = require("@api/smtp2goapi"),
  constants = require("../constants/constants"),
  smartsheet = require("../modules/smartsheet"),
  rmOrderDetails = require("../constants/rmOrderDetails");

const sendEmailSMTP2Go = async ({ orderId, rowId, filename, downloadUrl }) => {
  const sheetId = rmOrderDetails.id;

  const { cells: rowCells } = await smartsheet.getRow(sheetId, rowId);
  const toEmails = rowCells[rmOrderDetails.emailColumnIndex].displayValue
    .replace(/ /g, "")
    .split(",")
    .map((email) => `<${email}>`);

  smtp2Goapi.auth(constants.smtp2GoApiKey);
  smtp2Goapi
    .sendStandardEmail({
      sender: "LG&P <noreply@lginstore.com>",
      to: toEmails,
      subject: `Confirmation - Order ${orderId}`,
      html_body: "<strong>Thank You For Your Order!</strong>",
      attachments: [
        {
          filename,
          mimetype: "application/pdf",
          url: downloadUrl,
        },
      ],
    })
    .then(({ data }) => {
      console.log(data);
      console.log("Email sent successfully.");
    })
    .catch((err) => console.error(err));
};

module.exports = sendEmailSMTP2Go;
