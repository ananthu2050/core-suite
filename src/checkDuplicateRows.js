var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var checkDuplicateRows = new DataprooferTest();
var percent = function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

/**
 * Check for any duplicate rows in the spreadsheet. Optionally
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @param  {Object} input - accept user input, such as selected Columns
 * @return {Object} result an object describing the result
 */
checkDuplicateRows.name("Duplicate Rows")
  .description("Check for any identical rows in the spreadsheet.")
  .methodology(function(rows, columnHeads, input) {
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

    var numDupes = 0;
    Object.keys(dupes).forEach(function(hash){
      if(dupes[hash].count > 1) {
        numDupes++;
      }
    })

    var newSummary = _.template(`
      We found <span class="test-value"><%= numDupes %></span> rows </span>.
    `)({
      columnHeads: columnHeads,
      numDupes: numDupes,
      rows: rows
    });

    this.summary(newSummary);
    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      name: this.name(),
      description: this.description(),
      highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
      summary: newSummary
    };
    return result;
  });

module.exports = checkDuplicateRows;
