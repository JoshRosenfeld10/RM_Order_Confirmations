const axios = require("axios"),
  rmOrderDetails = require("../constants/rmOrderDetails"),
  smartsheet = require("../modules/smartsheet");

const uploadQRCode = async ({ rowId, orderId }) => {
  const sheetId = rmOrderDetails.id;
  const columnId = rmOrderDetails.QRCodeId;

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
