/**
 * Simple test to count and display the number of rows
 * @param  {Array}
 * @return {Object}
 */

function numberOfRows(rows) {
  var message = "This spreadsheet has " + rows.length + " rows"
  var template = _.template(`
    <span>This spreadsheet has <%= rows %> rows</span>
  `)({ rows: rows.length })
  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    title: "Number of rows",
    message: message,
    template: template
  }
  return result;
}

module.exports = numberOfRows;