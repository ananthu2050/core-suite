var DataprooferTest = require("dataproofertest-js");
var util = require("dataproofertest-js/util");
var maxSmallInteger = new DataprooferTest();

/**
 * Indicates an `smallint` at its upper signed limit (MySQL or PostgreSQL) of 32,767 or its upper unsigned limit (MySQL) of 65,535.
 * Common database programs, like MySQL, have a cap on how big of a number it can save.
 * Please see the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html) or [PostgreSQL documentation](http://www.postgresql.org/docs/9.5/interactive/datatype-numeric.html) for more information.
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
maxSmallInteger.name("Small integer at its SQL upper limit")
  .description("If a column contains numbers, make sure it's not 65,535 or 32,767. Common database programs like MySQL limit to the size of numbers it can store.")
  .conclusion("Inquire about this error with the dataset's maintainer")
  .methodology(function(rows, columnHeads) {
    var maxSmallInts = {};
    columnHeads.forEach(function(columnHead) {
      maxSmallInts[columnHead] = 0;
    });
    // we will want to mark cells to be highlighted here
    var cells = [];
    var didPass = true;
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {};
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        var strippedCell = util.stripNumeric(cell);
        var f = parseFloat(strippedCell);
        // this will only be true if the cell is a number
        if((typeof f === "number") && (f === 32767 || f === 65535)) {
          maxSmallInts[columnHead] += 1;
          currentRow[columnHead] = 1;
          didPass = false;
        } else {
          currentRow[columnHead] = 0;
        }
      });
      // push our marking row onto our cells array
      cells.push(currentRow);
    });

    var result = {
      passed: didPass,
      highlightCells: cells // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    };
    return result;
  });

module.exports = maxSmallInteger;
