const smartsheet = require("../modules/smartsheet");

const readyForAttachment = async (sheetId, rowId) => {
  // Check In-Queue status
  const inQueueArrayIndex = 12; // TODO: change when migrating sheets
  const orderIdArrayIndex = 0;

  const row = await smartsheet.getRow(sheetId, rowId);
  if (row.cells[inQueueArrayIndex].value) return false;

  // Check if PDF for given orderId already exists
  const orderId = row.cells[orderIdArrayIndex].value;
  const { data: attachments } = await smartsheet.getAttachments(sheetId);
  for (const attachment of attachments) {
    if (attachment.name === `${orderId}.pdf`) return false;
  }

  return true;
};

module.exports = readyForAttachment;
