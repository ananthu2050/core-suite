var _ = require('lodash');

/**
 * Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)
 * 
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 */
function numberOfRowsIs65k(rows, columnHeads) {
  var consoleMessage;
  var htmlTemplate;
  var passed;
  if(rows.length === 65536 || rows.length === 65535) { // including both for now, not clear if header row should be included
    consoleMessage = "Warning: This spreadsheet has " + rows.length + " rows, a common cutoff point for Excel indicating your dataset may be missing rows."
    htmlTemplate = _.template(`
      <span class="warning">This spreadsheet has <%= rows %> rows, a common cutoff point for Excel indicating your dataset may be missing rows.</span>
    `)({ rows: rows.length })
    passed = false;
  } else {
    passed = true;
    consoleMessage = "No anomolies detected"
  }
  
  var result = {
    passed: passed, // this doesn't really fail, as it is mostly an insight
    title: "Potentially missing rows",
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  }
  return result;
}

module.exports = numberOfRowsIs65k;