var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var util = require('dataproofertest-js/util');
var columnsContainNumbers = new DataprooferTest();

/**
 * Integers at their upper limit
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
columnsContainNumbers.name("Integers at their upper limit")
  .description("If the column contains numbers, make sure it's not 2,097,152. Database programs like SQL have a limit to the size of numbers it can calculate.")
  .methodology(function(rows, columnHeads) {
    var numbers = {};
    columnHeads.forEach(function(columnHead) {
      numbers[columnHead] = 0;
    })
    var cells = [] // we will want to mark cells to be highlighted here
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var currentRow = {}
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        var f = parseFloat(cell);
        // this will only be true if the cell is a number
        if((f.toString() === cell || typeof cell === "number") && f === 2097152) {
            numbers[columnHead] += 1;
            currentRow[columnHead] = 1
        } else {
          currentRow[columnHead] = 0
        }
      })
      // push our marking row onto our cells array
      cells.push(currentRow)
    })

    var consoleMessage = "# of rows for each column with number values:<br/> ";
    columnHeads.forEach(function(columnHead, i) {
      consoleMessage += columnHead + ": " + numbers[columnHead]
      if(i < columnHeads.length-1) consoleMessage += "<br/> "
    })

    var newSummary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(numbers[columnHead]) { %>
        We found <span class="test-value"><%= numbers[columnHead] %></span> cells (<%= percent(numbers[columnHead]/rows.length) %>) with a numeric value for column <span class="test-column"><%= columnHead %></span><br/>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      numbers: numbers,
      rows: rows,
      percent: util.percent
    });

    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
      summary: newSummary
    }
    return result;
  });

module.exports = columnsContainNumbers;
