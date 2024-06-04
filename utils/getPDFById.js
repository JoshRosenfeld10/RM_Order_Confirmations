const config = require("../modules/config");

const API_SECRET = config.pdfMonkeyToken;

const getPDFById = async (pdfId) => {
  try {
    const res = await fetch(
      `https://api.pdfmonkey.io/api/v1/document_cards/${pdfId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getPDFById();
