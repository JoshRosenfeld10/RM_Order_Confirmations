const smartsheet = require("../modules/smartsheet");

const readyForAttachment = async (sheetId, rowId) => {
  // Check In-Queue status
  const inQueueArrayIndex = 12; // TODO: change when migrating sheets
  const row = await smartsheet.getRow(sheetId, rowId);
  if (row.cells[inQueueArrayIndex].value) return false;

  // Check if current row already has an attachment
  const rowAttachments = await smartsheet.getRowAttachments(sheetId, rowId);
  return rowAttachments.data.length === 0 ? true : false;
};

module.exports = readyForAttachment;
