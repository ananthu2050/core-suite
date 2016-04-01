var _ = require("lodash");
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
maxSmallInteger.name("Small integers at their upper limit")
  .description("If a column contains numbers, make sure it's not 65,535 or 32,767. Common database programs like MySQL limit to the size of numbers it can store.")
  .methodology(function(rows, columnHeads) {
    var maxSmallInts = {};
    columnHeads.forEach(function(columnHead) {
      maxSmallInts[columnHead] = 0;
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
        if((f.toString() === cell || typeof cell === "number") && (f === 32767 || f === 65535)) {
          maxSmallInts[columnHead] += 1;
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
    if (_.isEmpty(maxSmallInts)) {
      passed = true;
    } else {
      passed = false;
    }

    var newSummary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(maxSmallInts[columnHead]) { %>
        <p class="test-value"><%= maxSmallInts[columnHead] %></span> cells (<%= percent(maxSmallInts[columnHead]/rows.length) %>) with a maximum small integer value in <span class="test-column"><%= columnHead %></p>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      maxSmallInts: maxSmallInts,
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

module.exports = maxSmallInteger;
