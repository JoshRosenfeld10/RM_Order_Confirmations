const getCellByColumnName = require("./getCellByColumnName");

const generateOrderDetails = (sourceRow, orders) => {
  const orderId = getCellByColumnName(
    sourceRow,
    "Order ID",
    columnMap
  ).displayValue;
  const productId = getCellByColumnName(
    sourceRow,
    "Product ID",
    columnMap
  ).displayValue;
  const part = getCellByColumnName(
    sourceRow,
    "LG&P Part",
    columnMap
  ).displayValue;
  const description = getCellByColumnName(
    sourceRow,
    "LG&P Description"
  ).displayValue;
  const quantity = getCellByColumnName(
    sourceRow,
    "Quantity",
    columnMap
  ).displayValue;
  const shipToAddress = getCellByColumnName(
    sourceRow,
    "Ship to Address",
    columnMap
  ).displayValue;
  const PO = getCellByColumnName(sourceRow, "PO#", columnMap).displayValue;
  const businessName = getCellByColumnName(
    sourceRow,
    "Business Name"
  ).displayValue;
  const shippingContactName = getCellByColumnName(
    sourceRow,
    "Shipping Contact Name",
    columnMap
  ).displayValue;
  const shippingContactPhoneNumber = getCellByColumnName(
    sourceRow,
    "Shipping Contact Phone Number",
    columnMap
  ).displayValue;
  const email = getCellByColumnName(sourceRow, "Email").displayValue;
  const submissionDate = getCellByColumnName(
    sourceRow,
    "Submission Date",
    columnMap
  ).value;

  if (orders[orderId] === undefined) {
    orders[orderId] = {
      Items: [],
    };
  }

  const order = orders[orderId];
  order["Ship_to_Address"] = shipToAddress;
  order["Order_ID"] = orderId;
  order["Email"] = email;
  order["PO#"] = PO;
  order["Business_Name"] = businessName;
  order["Shipping_Contact_Name"] = shippingContactName;
  order["Shipping_Contact_Phone_Number"] = shippingContactPhoneNumber;
  order["Submission_Date"] = submissionDate;
  order["Items"].push({
    "Part ID": productId,
    "Part Name": part,
    "Part Description": description,
    Quantity: quantity,
  });
};

module.exports = generateOrderDetails();
