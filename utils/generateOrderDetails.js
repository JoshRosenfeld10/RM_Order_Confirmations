const getQRCodeDataUri = require("./getQRCodeDataUri");

const generateColumnMap = (sheetColumns) => {
  let columnMap = {};
  sheetColumns.forEach((column) => {
    columnMap[column.title] = column.id;
  });
  return columnMap;
};

const getCellByColumnName = (row, columnName, columnMap) => {
  const columnId = columnMap[columnName];
  return row.cells.find((c) => {
    return c.columnId == columnId;
  });
};

const generateRowDetails = (sourceRow, order, columnMap) => {
  if (order["Order_ID"] === undefined) {
    const orderId = getCellByColumnName(
      sourceRow,
      "Order ID",
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
      "Business Name",
      columnMap
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
    const email = getCellByColumnName(
      sourceRow,
      "Tracking Emails",
      columnMap
    ).displayValue;
    // const submissionDate = getCellByColumnName(
    //   sourceRow,
    //   "Submission Date",
    //   columnMap
    // ).value;

    order["Ship_to_Address"] = shipToAddress;
    order["Order_ID"] = orderId;
    order["Email"] = email.replace(/ /g, "").split(",")[0];
    console.log(order["Email"]);
    order["PO"] = PO;
    order["Business_Name"] = businessName;
    order["Shipping_Contact_Name"] = shippingContactName;
    order["Shipping_Contact_Phone_Number"] = shippingContactPhoneNumber;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    order["Submission_Date"] = `${day}/${month}/${year}`;
    order["Total_Boxes"] = 0;
  }

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
    "LG&P Description",
    columnMap
  ).displayValue;
  const quantity = getCellByColumnName(
    sourceRow,
    "Order Qty",
    columnMap
  ).displayValue;

  order["Items"].push({
    "Part ID": productId,
    "Part Name": part,
    "Part Description": description,
    Quantity: quantity,
  });
  order["Total_Boxes"] = order["Total_Boxes"] += parseInt(quantity);
};

const generateOrderDetails = async ({
  sheetRows,
  sheetColumns,
  inputtedRow,
}) => {
  const columnMap = generateColumnMap(sheetColumns);
  const orderId = getCellByColumnName(
    inputtedRow,
    "Order ID",
    columnMap
  ).displayValue;
  const qrCodeDataUri = await getQRCodeDataUri(orderId);
  let order = {
    Items: [],
    QR_Code_URI: qrCodeDataUri,
  };

  sheetRows.forEach((row) => {
    if (
      getCellByColumnName(row, "Order ID", columnMap).displayValue === orderId
    ) {
      generateRowDetails(row, order, columnMap);
    }
  });

  return order;
};

module.exports = generateOrderDetails;
