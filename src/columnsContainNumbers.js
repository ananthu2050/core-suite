var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var columnsContainNumbers = new DataprooferTest();
var percent = function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

/**
 * Determine the percentage of rows that are numbers for each column
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
columnsContainNumbers.name("Numeric cells")
  .description("Determine the percentage of rows that are numbers for each column")
  .methodology(function(rows, columnHeads) {
    var numbers = {};
    columnHeads.forEach(function(columnHead) {
      numbers[columnHead] = 0;
    })
    var cells = [] // we will want to mark cells to be highlighted here
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var crow = {}
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        var f = parseFloat(cell);
        // this will only be true if the cell is a number
        if(f.toString() === cell || typeof cell === "number") {
          numbers[columnHead] += 1;
          crow[columnHead] = 1
        } else {
          crow[columnHead] = 0
        }
      })
      // push our marking row onto our cells array
      cells.push(crow)
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
      percent: percent
    });

    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      summary: newSummary
    }
    return result;
  });

module.exports = columnsContainNumbers;
