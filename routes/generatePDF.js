const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser").json(),
  asyncHandler = require("express-async-handler"),
  smartsheet = require("../modules/smartsheet"),
  readyForAttachment = require("../utils/readyForAttachment"),
  generateOrderDetails = require("../utils/generateOrderDetails"),
  generatePDF = require("../utils/generatePDF");

router.use((req, res, next) => {
  if (req.headers["smartsheet-hook-challenge"]) {
    res.setHeader(
      "smartsheet-hook-response",
      req.headers["smartsheet-hook-challenge"]
    );
    res.send({
      smartsheetHookResponse: req.headers["smartsheet-hook-challenge"],
    });
  } else {
    next();
  }
});

/**
 * Example Request Body
  {
    "nonce": "dea04437-e6f6-42be-9647-b9b296131a1b",
    "timestamp": "2024-06-05T14:53:37.003+00:00",
    "webhookId": 7455865323186052,
    "scope": "sheet",
    "scopeObjectId": 585916863172484,
    "events": [
        {
            "objectType": "cell",
            "eventType": "updated",
            "rowId": 3118671287127940,
            "columnId": 8206253518966660,
            "userId": 2512811755628420,
            "timestamp": "2024-06-05T14:53:31.000+00:00"
        }
    ]
}
 */
router.post(
  "/",
  bodyParser,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const sheetId = req.body.scopeObjectId;
    const { rowId, eventType } = req.body.events[0];

    // If the webhook event is not an update event
    if (eventType !== "updated") {
      res.sendStatus(200);
      return;
    }

    const validRow = await readyForAttachment(sheetId, rowId);
    // If row already has attachment or is in-queue
    if (!validRow) {
      res.sendStatus(200);
      return;
    }

    // Generate Order Details
    const { rows, columns } = await smartsheet.getSheet(sheetId);
    const inputtedRow = await smartsheet.getRow(sheetId, rowId);
    const orderDetails = await generateOrderDetails({
      sheetRows: rows,
      sheetColumns: columns,
      inputtedRow,
    });

    // Generate Order Confirmation PDF
    await generatePDF(orderDetails, rowId, "order_confirmation");

    // Generate Packing Slip PDF
    await generatePDF(orderDetails, rowId, "packing_slip");

    res.sendStatus(200);
  })
);

router.use((error, req, res) => {
  if (error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
