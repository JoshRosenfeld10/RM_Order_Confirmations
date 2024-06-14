const axios = require("axios"),
  apiTest = require("../constants/apiTest"),
  smartsheet = require("../modules/smartsheet");

const uploadQRCode = async ({ rowId, filename }) => {
  const sheetId = apiTest.id;
  const columnId = apiTest.QRCodeId;
  const orderId = filename.slice(0, -4);

  axios({
    url: `http://api.qrserver.com/v1/create-qr-code/?data=${orderId}&size=150x150`,
    method: "GET",
    responseType: "stream",
  }).then(async (response) => {
    await smartsheet.addImageToCell({
      rowId,
      sheetId,
      columnId,
      fileStream: response.data,
      fileSize: response.data["_readableState"].length,
      fileName: `${orderId}.png`,
    });
  });
};

module.exports = uploadQRCode;
