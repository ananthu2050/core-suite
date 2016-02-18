var _ = require('lodash');
var numberOfRows = new DataprooferTest();

/**
 * Count and display the number of rows
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
numberOfRows.name('Number of rows')
  .description('A count of the number of rows')
  .methodology(function(rows) {
    var this._rowsCount = rows.length
    this._summary = _.template(`
      <span>This spreadsheet has <%= rows %> rows</span>
    `)({ rows: this._rowsCount })
    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      name: this._name,
      description: this._description,
      summary: this._summary
    }
    return result;
  })

module.exports = numberOfRows;
