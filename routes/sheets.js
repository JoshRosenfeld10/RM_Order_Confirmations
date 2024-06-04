const express = require("express");
const router = express.Router();
const smartsheet = require("../modules/smartsheet");

router.get("/", async (req, res) => {
  const sheets = await smartsheet.getSheets();
  res.send(sheets);
});

router.get("/:id", async (req, res) => {
  const sheet = await smartsheet.getSheet(req.params.id);
  res.send(sheet);
});

router.get("/attachments/:id", async (req, res) => {
  const sheetAttachments = await smartsheet.getAttachments(req.params.id);
  res.send(sheetAttachments);
});

module.exports = router;
