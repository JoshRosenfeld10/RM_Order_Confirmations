const express = require("express"),
  sheets = require("./routes/sheets"),
  webhooks = require("./routes/webhooks"),
  generatePDF = require("./routes/generatePDF"),
  attachOrderConfirmationPDF = require("./routes/attachOrderConfirmationPDF"),
  attachPackingSlipPDF = require("./routes/attachPackingSlipPDF"),
  constants = require("./constants/constants"),
  config = require("./modules/config"),
  port = config.port || 3000,
  app = express();

if (constants.local) {
  app.use("/sheets", sheets);
  app.use("/webhooks", webhooks);
}

app.use("/generatePDF", generatePDF);
app.use("/attachOrderConfirmationPDF", attachOrderConfirmationPDF);
app.use("/attachPackingSlipPDF", attachPackingSlipPDF);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
