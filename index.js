const express = require("express"),
  sheets = require("./routes/sheets"),
  webhooks = require("./routes/webhooks"),
  attach = require("./routes/attach"),
  constants = require("./constants/constants"),
  config = require("./modules/config"),
  port = config.port || 3000,
  app = express();

if (constants.local) {
  app.use("/sheets", sheets);
  app.use("/webhooks", webhooks);
}

app.use("/attach", attach);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
