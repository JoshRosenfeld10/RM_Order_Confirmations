const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser").json(),
  uploadQRCode = require("../utils/uploadQRCode"),
  sendEmail = require("../utils/sendEmail"),
  smartsheet = require("../modules/smartsheet"),
  apiTest = require("../constants/apiTest"),
  axios = require("axios"),
  { buffer } = require("node:stream/consumers");

/**
   * Sample Request Body
   * {
    "document": {
        "id": "9e1dc043-cf81-4091-957e-9d203ac916a1",
        "created_at": "2024-06-05T21:44:17.345+02:00",
        "document_template_id": "8140ac56-e996-452b-9a0c-065e16f865f4",
        "meta": "{\"_filename\":\"RM00139\",\"rowId\":8439657481998212}",
        "status": "success",
        "updated_at": "2024-06-05T21:44:19.081+02:00",
        "xml_data": null,
        "app_id": "38f04de5-4f6f-4bf6-afe4-5df564a04729",
        "download_url": "https://pdfmonkey-store.s3.eu-west-3.amazonaws.com/production/backend/document/9e1dc043-cf81-4091-957e-9d203ac916a1/RM00139.pdf?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2DEHCSJKRKT25747%2F20240605%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240605T194419Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e198afe068b136a6048a5b3f86716696f019eaba5c42be14cd70a655e8f7bf35",
        "checksum": "Zz2GG9CzVzrMxm8SrTcszx21sRM_k3tq",
        "failure_cause": null,
        "filename": "RM00139.pdf",
        "preview_url": "https://preview.pdfmonkey.io/pdf/web/viewer.html?file=https%3A%2F%2Fpreview.pdfmonkey.io%2Fdocument-render%2F9e1dc043-cf81-4091-957e-9d203ac916a1%2FZz2GG9CzVzrMxm8SrTcszx21sRM_k3tq",
        "public_share_link": null
      }
    }
   */
router.post("/", bodyParser, async (req, res) => {
  const { filename, download_url: downloadUrl } = req.body.document;
  const { rowId } = JSON.parse(req.body.document.meta);
  const orderId = filename.slice(0, -4);
  const sheetId = apiTest.id;

  await uploadQRCode({
    orderId,
    rowId,
  });

  // Download stream of PDF
  axios({
    url: downloadUrl,
    method: "GET",
    responseType: "stream",
  })
    .then(async (response) => {
      // Create buffer of PDF
      const fileBuffer = await buffer(response.data);

      // Add PDF order confirmation attachment to selected row
      await smartsheet.addRowFileAttachment({
        sheetId,
        rowId,
        fileStream: fileBuffer,
        fileSize: response.data.rawHeaders[response.data.rawHeaders.length - 1],
        fileName: filename,
      });
      console.log("Order Confirmation PDF attached successfully.");

      // Send order confirmation email
      await sendEmail({
        orderId,
        rowId,
        filename,
        fileBuffer,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  res.sendStatus(200);
});

router.use((error, req, res) => {
  if (error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
