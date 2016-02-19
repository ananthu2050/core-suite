var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var columnsContainNothing = new DataprooferTest();
var percent = function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

/**
* Calculates the percentage of rows that are empty for each column
*
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
columnsContainNothing.name("Empty Cells")
  .description("Calculates the percentage of rows that are empty for each column")
  .methodology(function(rows, columnHeads) {
    var nothing = {};
    columnHeads.forEach(function(columnHead) {
      nothing[columnHead] = 0;
    })

    var cells = [] // we will want to mark cells to be highlighted here
    // look through the rows
    rows.forEach(function(row) {
      // we make a row to keep track of cells we want to highlight
      var crow = {}
      columnHeads.forEach(function(columnHead) {
        var cell = row[columnHead];
        if(cell === "" || cell === null) {
          nothing[columnHead] += 1;
          crow[columnHead] = 1;
        } else {
          crow[columnHead] = 0;
        }
      })
      // push our marking row onto our cells array
      cells.push(crow)
    })

    var consoleMessage = ", ";
    columnHeads.forEach(function(columnHead, i) {
      consoleMessage += columnHead + ": " + nothing[columnHead]
      if(i < columnHead.length-1) consoleMessage += ", "
    })

    var newSummary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(nothing[columnHead]) { %>
        We found <span class="test-value"><%= nothing[columnHead] %></span> empty cells (<%= percent(nothing[columnHead]/rows.length) %>) for column <span class="test-column"><%= columnHead %></span><br/>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      nothing: nothing,
      rows: rows,
      percent: percent
    });

    this.summary(newSummary);
    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      highlightCells: cells,
      summary: newSummary
    }
    return result;
  });

module.exports =  columnsContainNothing;
