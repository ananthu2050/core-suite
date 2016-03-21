var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var stringsHaveExactly255Characters = new DataprooferTest();
var percent = function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

/**
 * Determine the cells that have exactly 255 characters (SQL upper limit error). See ProPublica's bad data guide for further information
 * https://github.com/propublica/guides/blob/master/data-bulletproofing.md#integrity-checks-for-every-data-set
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
stringsHaveExactly255Characters.name("Words at their character limit")
  .description("Determine the cells that have exactly 255 characters. Database programs like SQL have a limit to the length of words it can output.")
  .methodology(function(rows, columnHeads) {
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

    var consoleMessage, newSummary, passed;
    if(has255) {
      passed = false
      newSummary = _.template(`Warning: we found strings that are exactly 255 characters long. This can indicate an error with a SQL export:<br/>
        <% _.forEach(columnHeads, function(columnHead) { %>
          <% if(strings[columnHead]) { %>
          We found <span class="test-value"><%= strings[columnHead] %></span> cells (<%= percent(strings[columnHead]/rows.length) %>) with 255 character-length strings for column <span class="test-column"><%= columnHead %></span><br/>
          <% } %>
        <% }) %>
      `)({
        columnHeads: columnHeads,
        strings: strings,
        rows: rows,
        percent: percent
      });

    } else {
      passed = true;
      newSummary = "No anomolies found with character lengths of cells";
    }

    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
      summary: newSummary
    }
    return result;
  });

module.exports = stringsHaveExactly255Characters;
