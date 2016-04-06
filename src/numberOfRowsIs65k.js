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
  .conclusion("Inquire about this error with the dataset's maintainer")
  .methodology(function(rows, columnHeads) {
    var didPass = true;
    if(rows.length === 65536) {
      didPass = false;
    }
    var result = {
      passed: didPass
    };
    return result;
  });

module.exports = numberOfRowsIs65k;
