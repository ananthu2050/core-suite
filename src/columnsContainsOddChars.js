var DataprooferTest = require("dataproofertest-js");
var util = require("dataproofertest-js/util")
var _ = require("lodash");
var columnsContainsOddChars = new DataprooferTest();

/**
* Calculates the percentage of rows that are empty for each column
*
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
columnsContainsOddChars.name("Odd Letters & Characters")
  .description("Determine which cells contain odd characters. These can cause errors with some visualization & analysis tools.")
  .methodology(function (rows, columnHeads) {
    var testState = "passed";
    // we will want to mark cells to be highlighted here
    var cellsToHighlight = [];

    function containsOddChar(str) {
      var result = false;
      _.forEach(str, function(char) {
        if (char.charCodeAt() > 255) result = true;
      });
      return result;
    }
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {};
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        if (util.isString(cell) && containsOddChar(cell)) {
          currentRow[columnHead] = 1;
          testState = "warn";
        } else {
          currentRow[columnHead] = 0;
        }
      });
      // push our marking row onto our cells array
      cellsToHighlight.push(currentRow);
    });
    var result = {
      testState: testState,
      highlightCells: cellsToHighlight
    };
    return result;
  })
  .conclusion(function(result) {
    var conclusionStr = "";
    var columns = _.keys(result.columnWise);
    columns.forEach(function(column) {
      // Column foo:
      var currCount = result.columnWise[column];
      if (currCount > 0) {
        conclusionStr += column + ": ";
        conclusionStr += result.columnWise[column] + " cells, ";
        conclusionStr += util.percent(result.columnWise[column] / result.highlightCells.length);
        conclusionStr += " of column <br>";
      }
    });
    return conclusionStr;
  });


module.exports =  columnsContainsOddChars;
