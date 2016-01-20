var _ = require('lodash');
var percent = require('../utils/percent');

/**
 * Determine the percentage of rows that are numbers for each column
 * @param  {Array} the rows of the spreadsheet
 * @return {Object} the result
 */
function columnsContainNumbers(rows) {
  var columnHeads = Object.keys(rows[0]);
  var numbers = {};
  columnHeads.forEach(function(columnHead) {
    numbers[columnHead] = 0;
  })
  var cells = [] // we will want to mark cells to be highlighted here
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    columnHeads.forEach(function(columnHead) {
      var cell = row[columnHead];
      var f = parseFloat(cell);
      if(f.toString() === cell) { // this will only be true if the cell is a number
        numbers[columnHead] += 1;
        crow[columnHead] = 1
      } else {
        crow[columnHead] = 0
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var consoleMessage = "# of rows for each column with number values:<br/> ";
  columnHeads.forEach(function(columnHead, i) {
    consoleMessage += columnHead + ": " + numbers[columnHead]
    if(i < columnHeads.length-1) consoleMessage += "<br/> "
  })

  var htmlTemplate = _.template(`
  <% _.forEach(columnHeads, function(columnHead) { %>
    <% if(numbers[columnHead]) { %>
    We found <span class="test-value"><%= numbers[columnHead] %></span> cells (<%= percent(numbers[columnHead]/rows.length) %>) with a numeric value for column <span class="test-column"><%= columnHead %></span><br/>
    <% } %>
  <% }) %>

  `)({ columnHeads: columnHeads, numbers: numbers, rows: rows, percent: percent })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: numbers,
    title: "Numeric Cells",
    highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  }
  return result;
}

module.exports = columnsContainNumbers;