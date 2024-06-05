const express = require("express"),
  sheets = require("./routes/sheets"),
  webhooks = require("./routes/webhooks"),
  generatePDF = require("./routes/generatePDF"),
  attachPDF = require("./routes/attachPDF"),
  constants = require("./constants/constants"),
  config = require("./modules/config"),
  port = config.port || 3000,
  app = express();

if (constants.local) {
  app.use("/sheets", sheets);
  app.use("/webhooks", webhooks);
}

app.use("/generatePDF", generatePDF);
app.use("/attachPDF", attachPDF);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
