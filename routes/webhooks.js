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
 * body = {
 *      name: "myWebhook",
 *      callbackURL: "https://www.myApp.com/webhooks",
 *      scope: "sheet",
 *      scopeObjectId: 3285357287499652,
 *      events: ["*.*"],
 *      version: 1
 * }
 *
 * options = {
 *      body: body
 * }
 */
router.post("/", bodyParser, async (req, res) => {
  const data = await smartsheet.createWebhook(req.body);
  res.send(data);
});

router.post("/:id", bodyParser, async (req, res) => {
  const data = await smartsheet.updateWebhook(req.params.id, req.body);
  res.send(data);
});

module.exports = router;
