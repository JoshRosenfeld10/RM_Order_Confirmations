const express = require("express"),
  router = express.Router(),
  smartsheet = require("../modules/smartsheet"),
  bodyParser = require("body-parser").json();

router.get("/", async (req, res) => {
  const data = await smartsheet.getWebhooks();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  try {
    const data = await smartsheet.getWebhook(req.params.id);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

/**
 * Example Request Body
 * {
    "name": "In-Queue-Change",
    "callbackUrl": "https://rm-order-confirmations.onrender.com/attach",
    "scope": "sheet",
    "scopeObjectId": 585916863172484,
    "subscope": {
        "columnIds": [
            8206253518966660
        ]
    },
    "events": [
        "*.*"
    ],
    "version": 1
}
 */
router.post("/", bodyParser, async (req, res) => {
  const data = await smartsheet.createWebhook(req.body);
  res.send(data);
});

/**
 * Example Request Body
 * {
 *    enabled: true
 * }
 */
router.post("/:id", bodyParser, async (req, res) => {
  const data = await smartsheet.updateWebhook(req.params.id, req.body);
  res.send(data);
});

module.exports = router;
