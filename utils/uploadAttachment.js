/**
 * DEPRECATED
 */

const axios = require("axios"),
  FormData = require("form-data"),
  constants = require("../constants/constants"),
  apiTest = require("../constants/apiTest");

const uploadAttachment = async ({ downloadUrl, rowId, filename }) => {
  const sheetId = apiTest.id;
  const response = await axios({
    url: downloadUrl,
    method: "GET",
    responseType: "stream",
  });

  const form = new FormData();
  form.append("file", response.data, filename);

  const postHeaders = {
    headers: {
      Authorization: "Bearer " + constants.smartsheetToken,
      ...form.getHeaders(),
    },
    data: form,
  };

  axios
    .post(
      `https://api.smartsheet.com/2.0/sheets/${sheetId}/rows/${rowId}/attachments`,
      form,
      postHeaders
    )
    .catch((error) => {
      console.error(error);
    });
};

module.exports = uploadAttachment;
