const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser").json(),
  asyncHandler = require("express-async-handler"),
  smartsheet = require("../modules/smartsheet"),
  apiTest = require("../constants/apiTest");

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

router.post(
  "/",
  bodyParser,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  })
);

module.exports = router;
