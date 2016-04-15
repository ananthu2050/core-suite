var DataprooferTest = require("dataproofertest-js");
var util = require("dataproofertest-js/util");

var columnsContainNothing = new DataprooferTest();

/**
* Calculates the percentage of rows that are empty for each column
*
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
columnsContainNothing.name("Empty Cells")
  .description("Calculates the percentage of rows that are empty for each column")
  .conclusion("Empty cells can lead to gaps in your data analysis or visualization")
  .methodology(function(rows, columnHeads) {
    var testState = "passed";
    // we will want to mark cells to be highlighted here
    var cellsToHighlight = [];
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {};
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        if (util.isEmpty(cell)) {
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
  });

module.exports =  columnsContainNothing;
