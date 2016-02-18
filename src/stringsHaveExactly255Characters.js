var _ = require('lodash');
var percent = function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

/**
 * Determine the cells that have exactly 255 characters (SQL upper limit error)
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
function stringsHaveExactly255Characters(rows, columnHeads) {
  var strings = {};
  columnHeads.forEach(function(columnHead) {
    strings[columnHead] = 0;
  })
  var cells = [] // we will want to mark cells to be highlighted here
  var has255 = false
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    columnHeads.forEach(function(columnHead) {
      var cell = row[columnHead];
      if(cell.length === 255) {
        crow[columnHead] = 1
        strings[columnHead] += 1
        has255 = true; // we want to know if it occurrs at least once
      } else {
        crow[columnHead] = 0
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var consoleMessage, htmlTemplate, passed;
  if(has255) {
    passed = false
    consoleMessage = "Warning: we found strings that are exactly 255 characters long. This can indicate an error with a SQL export: ";
    columnHeads.forEach(function(columnHead, i) {
      consoleMessage += columnHead + ": " + strings[columnHead]
      if(i < columnHeads.length-1) consoleMessage += "<br/> "
    })

    htmlTemplate = _.template(`Warning: we found strings that are exactly 255 characters long. This can indicate an error with a SQL export:<br/>
    <% _.forEach(columnHeads, function(columnHead) { %>
      <% if(strings[columnHead]) { %>
      We found <span class="test-value"><%= strings[columnHead] %></span> cells (<%= percent(strings[columnHead]/rows.length) %>) with 255 character-length strings for column <span class="test-column"><%= columnHead %></span><br/>
      <% } %>
    <% }) %>
    `)({ columnHeads: columnHeads, strings: strings, rows: rows, percent: percent })

  } else {
    passed = true;
    consoleMessage = "No anomolies found with character lengths of cells";
  }

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    title: "Strings with 255 Characters (SQL upper limit error)",
    highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  }
  return result;
}

module.exports = stringsHaveExactly255Characters;
