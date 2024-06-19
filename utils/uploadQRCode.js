const axios = require("axios"),
  apiTest = require("../constants/apiTest"),
  smartsheet = require("../modules/smartsheet");

const uploadQRCode = async ({ rowId, orderId }) => {
  const sheetId = apiTest.id;
  const columnId = apiTest.QRCodeId;

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

    console.log("QR Code attached successfully.");
  });
};

module.exports = uploadQRCode;
