const client = require("smartsheet");
const constants = require("../constants/constants");

const smartsheet = () => {
  const createClient = () => {
    return client.createClient({
      accessToken: constants.smartsheetToken,
      logLevel: "info",
    });
  };

  return {
    getClient: async () => {
      return createClient();
    },
    getSheets: async () => {
      return await createClient().sheets.listSheets();
    },
    getWebhooks: async () => {
      return await createClient().webhooks.listWebhooks({});
    },
    getWebhook: async (id) => {
      return await createClient().webhooks.getWebhook({
        webhookId: id,
      });
    },
    createWebhook: async (body) => {
      return await createClient().webhooks.createWebhook({
        body,
      });
    },
    updateWebhook: async (webhookId, body) => {
      return await createClient().webhooks.updateWebhook({
        webhookId,
        body,
      });
    },
    getRow: async (sheetId, rowId) => {
      return await createClient().sheets.getRow({
        sheetId,
        rowId,
      });
    },
    getSheet: async (id) => {
      return await createClient().sheets.getSheet({
        id,
      });
    },
    getAttachments: async (sheetId) => {
      return await createClient().sheets.listAttachments({
        sheetId,
      });
    },
    getAttachment: async (sheetId, attachmentId) => {
      return await createClient().sheets.getAttachment({
        sheetId,
        attachmentId,
      });
    },
    getRowAttachments: async (sheetId, rowId) => {
      return await createClient().sheets.getRowAttachments({
        sheetId,
        rowId,
      });
    },
    addImageToCell: async ({
      sheetId,
      rowId,
      columnId,
      fileSize,
      fileName,
      fileStream,
    }) => {
      return await createClient().sheets.addImageToCell({
        sheetId,
        rowId,
        columnId,
        fileSize,
        fileName,
        fileStream,
      });
    },
    addRowFileAttachment: async ({
      sheetId,
      rowId,
      fileSize,
      fileName,
      fileStream,
    }) => {
      return await createClient().sheets.addRowFileAttachment({
        sheetId,
        rowId,
        fileSize,
        fileName,
        fileStream,
      });
    },
  };
};

module.exports = smartsheet();
