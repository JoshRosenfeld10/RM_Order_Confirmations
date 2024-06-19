const constants = require("../constants/constants");
const pdfMonkey = require("../constants/pdfMonkey");

/* 
document_template_id: pdfMonkey.document_template_id,
body: {
            Items: [
              {
                "Part ID": "AFIM00002",
                "Part Name": "AVD1001",
                "Part Description": "Arlo Wired HD Video Doorbell",
                Quantity: "1",
              },
              {
                "Part ID": "AFIM00008",
                "Part Name": "VMC4050P-100NAS-R",
                "Part Description": "REJECTED_Pro 4 Spotlight Camera (White)",
                Quantity: "1",
              },
            ],
            Ship_to_Address: "1 Valleybrook Dr, North York, ON M3B 2S7, Canada",
            Order_ID: "RM00139",
            Email: "jrosenfeld@lginstore.com",
            "PO#": "12345",
            Business_Name: "LG&P",
            Shipping_Contact_Name: "Josh Rosenfeld",
            Shipping_Contact_Phone_Number: "647-535-8118",
          }
*/

const generatePDF = async (body, rowId) => {
  try {
    const res = await fetch("https://api.pdfmonkey.io/api/v1/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${constants.pdfMonkeyToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        document: {
          document_template_id: pdfMonkey.document_template_id,
          status: "pending",
          payload: body,
          meta: {
            _filename: body["Order_ID"],
            rowId: rowId,
          },
        },
      }),
    });
    // const data = await res.json();
    console.log("PDF generated successfully.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = generatePDF;
