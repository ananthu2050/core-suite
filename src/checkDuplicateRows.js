var _ = require('lodash');
var percent = require('../utils/percent');

/**
 * Check for any duplicate rows in the spreadsheet. Optionally
 * 
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @param  {Object} input - accept user input, such as selected Columns
 * @return {Object} result an object describing the result
 */
function checkDuplicateRows(rows, columnHeads, input) {
  var selectedColumns = input.selectedColumns;
  var columns;
  if (selectedColumns && selectedColumns.length) {
    columns = selectedColumns;
  } else {
    columns = columnHeads;
  }

  var dupes = {};
  var cells = [] // we will want to mark cells to be highlighted here
  // look through the rows
  rows.forEach(function(row,i) {
    var crow = {} // we make a row to keep track of cells we want to highlight

    var hash = "";//
    columns.forEach(function(columnHead) {
      hash += row[columnHead] + "-|o.O|-"
    })
    columnHeads.forEach(function(columnHead) {
      crow[columnHead] = 0
    })
    if(dupes[hash]) {
      columns.forEach(function(columnHead) {
        crow[columnHead] = 1
      })
      dupes[hash].count++;
    } else {
      
      dupes[hash] = { count: 1, index: i }
    }
    cells.push(crow) // push our marking row onto our cells array
  })
  console.log("dupes", dupes)

  var numDupes = 0;
  Object.keys(dupes).forEach(function(hash){
    if(dupes[hash].count > 1) {
      numDupes++;
    }
  })

  var consoleMessage = "We found " + numDupes + " of duplicate rows<br/> ";

  var htmlTemplate = _.template(`
    We found <span class="test-value"><%= numDupes %></span> rows </span>.
  `)({ columnHeads: columnHeads, numDupes: numDupes, rows: rows })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    dupes: dupes,
    title: "Duplicate Rows",
    highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  }
  return result;
}

module.exports = checkDuplicateRows;