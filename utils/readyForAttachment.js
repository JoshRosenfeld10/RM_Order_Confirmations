const smartsheet = require("../modules/smartsheet");

const readyForAttachment = async (sheetId, rowId) => {
  // Check In-Queue status
  const inQueueArrayIndex = 21;
  const orderIdArrayIndex = 2;

  const row = await smartsheet.getRow(sheetId, rowId);
  if (row.cells[inQueueArrayIndex].value) return false;

  // Check if PDF for given orderId already exists
  const orderId = row.cells[orderIdArrayIndex].value;
  const { data: attachments } = await smartsheet.getAttachments(sheetId);
  for (const attachment of attachments) {
    if (
      attachment.name === `${orderId}.pdf` ||
      attachment.name === `${orderId}_PACKING_SLIP.pdf`
    )
      return false;
  }

  return true;
};

module.exports = readyForAttachment;
