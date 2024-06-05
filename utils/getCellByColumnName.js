const getCellByColumnName = (row, columnName, columnMap) => {
  const columnId = columnMap[columnName];
  return row.cells.find((c) => {
    return c.columnId == columnId;
  });
};

module.exports = getCellByColumnName;
