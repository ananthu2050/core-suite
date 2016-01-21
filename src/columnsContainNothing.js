var _ = require('lodash');
var percent = require('../utils/percent');

/**
 * Determine the percentage of rows that are empty for each column
*
 * @param  {Array} rows an array of objects representing rows in a spreadsheet
 * @return {Object} result an object describing the result
 */
function columnsContainNothing(rows) {
  // TODO: should we pass in the columns?
  // when using d3 it will include one of each detected column for all rows
  // so we have it implicitly. we may want to be more explicit
  var columnHead = Object.keys(rows[0]);
  var nothing = {};
  columnHead.forEach(function(columnHead) {
    nothing[columnHead] = 0;
  })

  var cells = [] // we will want to mark cells to be highlighted here
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    columnHead.forEach(function(columnHead) {
      var cell = row[columnHead];
      if(cell === "") { 
        nothing[columnHead] += 1;
        crow[columnHead] = 1;
      } else {
        crow[columnHead] = 0;
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var consoleMessage = ", ";
  columnHead.forEach(function(columnHead, i) {
    consoleMessage += columnHead + ": " + nothing[columnHead]
    if(i < columnHead.length-1) consoleMessage += ", "
  })

  var htmlTemplate = _.template(`
  <% _.forEach(columnHead, function(columnHead) { %>
    <% if(nothing[columnHead]) { %>
    We found <span class="test-value"><%= nothing[columnHead] %></span> empty cells (<%= percent(nothing[columnHead]/rows.length) %>) for column <span class="test-column"><%= columnHead %></span><br/>
    <% } %>
  <% }) %>
  `)({ columnHead: columnHead, nothing: nothing, rows: rows, percent: percent })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: nothing,
    title: "Empty Cells",
    highlightCells: cells,
    consoleMessage: consoleMessage, // for console rendering
    htmlTemplate: htmlTemplate,
  }
  return result;
}

module.exports =  columnsContainNothing;