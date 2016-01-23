var _ = require('lodash');

/**
 * Count and display the number of rows
 * 
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
function numberOfRows(rows, columnHeads) {
  var consoleMessage = "This spreadsheet has " + rows.length + " rows"
  var htmlTemplate = _.template(`
    <span>This spreadsheet has <%= rows %> rows</span>
  `)({ rows: rows.length })
  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    title: "Number of rows",
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  }
  return result;
}

module.exports = numberOfRows;