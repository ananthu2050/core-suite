var _ = require("lodash");
var DataprooferTest = require("dataproofertest-js");
var util = require("dataproofertest-js/util");
var maxSummedInteger = new DataprooferTest();

/**
 * Indicates a summed integers at its upper limit of 2,097,152.
 * Please see the [Integrity Checks](https://github.com/propublica/guides/blob/master/data-bulletproofing.md#integrity-checks-for-every-data-set) section of the ProPublica [Data Bulletproofing Guide](https://github.com/propublica/guides/blob/master/data-bulletproofing.md) for more information.
 *
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
maxSummedInteger.name("Summed integers at their upper limit")
  .description("If a column contains numbers, make sure it's not 2,097,152. Common database programs like MySQL limit to the size of numbers it can calculate.")
  .methodology(function(rows, columnHeads) {
    var maxSummedInts = {};
    columnHeads.forEach(function(columnHead) {
      maxSummedInts[columnHead] = 0;
    });
    // we will want to mark cells to be highlighted here
    var cells = [];
    var passed = true;
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {};
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        var f = parseFloat(cell);
        // this will only be true if the cell is a number
        if((f.toString() === cell || typeof cell === "number") && f === 2097152) {
          maxSummedInts[columnHead] += 1;
          currentRow[columnHead] = 1;
        } else {
          currentRow[columnHead] = 0;
        }
      });
      // push our marking row onto our cells array
      cells.push(currentRow);
    });

    // check if we found any max ints
    // and change the value of passed to reflect that
    if (_.isEmpty(maxSummedInts)) {
      passed = true;
    } else {
      passed = false;
    }

    var newSummary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(maxSummedInts[columnHead]) { %>
        <p class="test-value"><%= maxSummedInts[columnHead] %></span> cells (<%= percent(maxSummedInts[columnHead]/rows.length) %>) with a maximum summed integer in <span class="test-column"><%= columnHead %></p>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      maxSummedInts: maxSummedInts,
      rows: rows,
      percent: util.percent
    });

    var result = {
      passed: passed,
      highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
      summary: newSummary
    };
    return result;
  });

module.exports = maxSummedInteger;
