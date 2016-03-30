var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var util = require('dataproofertest-js/util');
var maxInteger = new DataprooferTest();

/**
 * Indicates an integer at its upper MySQL limit 2,147,483,647.
 * Common database programs, like MySQL, have a cap on how big of a number it can save.
 * Please see the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html) for more information.
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
maxInteger.name("Integers at their upper limit")
  .description("If a column contains numbers, make sure it's not 2,147,483,647. Common database programs like MySQL limit to the size of numbers it can calculate.")
  .methodology(function(rows, columnHeads) {
    var maxInts = {};
    columnHeads.forEach(function(columnHead) {
      maxInts[columnHead] = 0;
    });
    // we will want to mark cells to be highlighted here
    var cells = [];
    var passed = true;
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {}
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        var f = parseFloat(cell);
        // this will only be true if the cell is a number
        if((f.toString() === cell || typeof cell === "number") && f === 2147483647) {
            maxInts[columnHead] += 1;
            currentRow[columnHead] = 1;
        } else {
          currentRow[columnHead] = 0
        }
      })
      // push our marking row onto our cells array
      cells.push(currentRow)
    });

    // check if we found any max ints
    // and change the value of passed to reflect that
    if (_.isEmpty(maxInts) {
      passed = true;
    else{
      passed = false;
    }

    var newSummary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(maxInts[columnHead]) { %>
        <p class="test-value"><%= maxInts[columnHead] %></span> cells (<%= percent(maxInts[columnHead]/rows.length) %>) with a maximum summed integer in <span class="test-column"><%= columnHead %></p>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      maxInts: maxInts,
      rows: rows,
      percent: util.percent
    });

    var result = {
      passed: passed,
      highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
      summary: newSummary
    }
    return result;
  });

module.exports = maxInteger;
