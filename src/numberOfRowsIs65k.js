var _ = require('lodash');
var DataprooferTest = require("dataproofertest-js");
var numberOfRowsIs65k = new DataprooferTest();

/**
 * Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
numberOfRowsIs65k.name("Potentially missing rows")
  .description("Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)")
  .methodology(function(rows, columnHeads) {
    var newSummary;
    var passed;
    if(rows.length === 65536) { 
      newSummary = _.template(`
        <span class="warning">This spreadsheet has <%= rows %> rows, a common cutoff point for Excel indicating your dataset may be missing rows.</span>
      `)({ rows: rows.length })
      passed = false;
    } else {
      passed = true;
      newSummary = "No anomolies detected"
    }
    var result = {
      passed: passed, // this doesn't really fail, as it is mostly an insight
      summary: newSummary
    }
    return result;
  })

module.exports = numberOfRowsIs65k;
