const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser").json(),
  smartsheet = require("../modules/smartsheet"),
  rmOrderDetails = require("../constants/rmOrderDetails"),
  axios = require("axios"),
  { buffer } = require("node:stream/consumers");

/**
   * Sample Request Body
   * {
    "document": {
        "app_id": "38f04de5-4f6f-4bf6-afe4-5df564a04729",
        "created_at": "2024-06-27T19:59:54.185+02:00",
        "document_template_id": "30b678da-3ccb-45a7-9229-f1ad2ae28a79",
        "document_template_identifier": "R/M Packing Slip",
        "download_url": "https://pdfmonkey-store.s3.eu-west-3.amazonaws.com/production/backend/document/9fe0d5fc-9027-4eb7-b9ed-bf1e9ca21bd5/RM00139_packing_slip.pdf?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2DEHCSJKRKT25747%2F20240627%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240627T175956Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=27abc483131541edd953f7aaaa7502c7d742d1c343a393a29f16abe2df1d84a7",
        "failure_cause": null,
        "filename": "RM00139_packing_slip.pdf",
        "id": "9fe0d5fc-9027-4eb7-b9ed-bf1e9ca21bd5",
        "meta": "{\"_filename\":\"RM00139_packing_slip\",\"rowId\":2960746876866436}",
        "public_share_link": null,
        "status": "success",
        "updated_at": "2024-06-27T19:59:56.481+02:00"
    }
}
*/
router.post("/", bodyParser, async (req, res) => {
  const { filename, download_url: downloadUrl } = req.body.document;
  const { rowId } = JSON.parse(req.body.document.meta);
  const sheetId = rmOrderDetails.id;

  // Download stream of PDF
  axios({
    url: downloadUrl,
    method: "GET",
    responseType: "stream",
  })
    .then(async (response) => {
      // Create buffer of PDF
      const fileBuffer = await buffer(response.data);

      // Add PDF packing slip attachment to selected row
      await smartsheet.addRowFileAttachment({
        sheetId,
        rowId,
        fileStream: fileBuffer,
        fileSize: response.data.rawHeaders[response.data.rawHeaders.length - 1],
        fileName: filename,
      });
      console.log("Packing Slip PDF attached successfully.");
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
