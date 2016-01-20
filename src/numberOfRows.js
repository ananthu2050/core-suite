var _ = require('lodash');

/**
 * Simple test to count and display the number of rows
 * @param  {Array}
 * @return {Object}
 */
function numberOfRows(rows) {
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