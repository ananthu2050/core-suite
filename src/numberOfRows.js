var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
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
    var newSummary = _.template(`
      <span>This spreadsheet has <%= rows %> rows</span>
    `)({ rows: rows.length });
    this.summary(newSummary);
    var result = {
      passed: true, // this doesn't really fail, as it is mostly an insight
      summary: newSummary
    }
    return result;
  })

module.exports = numberOfRows;
