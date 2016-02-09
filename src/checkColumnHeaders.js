var _ = require('lodash');

/** 
 * Check for column headers in spreadsheet-like data 
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} result an object describing the result
 * @example
 * columnHeads({'': 'foo@whitehouse.gov', 'name': 'Jane Smith'});
 * // {"passed":false, "consoleMessage": , "htmlTemplate": _.comple('<%= missingHeadersCount %>');}
 */
function checkColumnHeaders(rows, columnHeads) {
  console.log("checking column headers", columnHeads.length);
  var totalColumnsCount = columnHeads.length;
  var missingHeadersCount = 0;
  var htmlTemplate;
  var consoleMessage;
  var passed;

  _.each(columnHeads, function(columnHead) {
    if (columnHead.length === 0 || columnHead === undefined || columnHead === null) {
      missingHeadersCount += 1;
    }
  });

  if (missingHeadersCount > 0) {
    passed = false
    columnOrColumns = missingHeadersCount > 1 ? "columns" : "column";
    consoleMessage = "We found " + missingHeadersCount + " " + columnOrColumns + " without a header"
    htmlTemplate = _.template(`
      We found <span class="test-value"><%= missingHeadersCount  %></span> <%= columnOrColumns %> a missing header, which means you'd need to take guesses about the present data or you should provide it with a unique, descriptive name.
    `)({
      'missingHeadersCount': missingHeadersCount,
      'columnOrColumns': columnOrColumns
    });
  } else if (missingHeadersCount === 0) {
    passed = true
    consoleMessage = "No anomolies detected";
  } else {
    passed = false
    consoleMessage = "We had problems reading your column headers"
  }

  var result = {
    passed: passed,
    title: "Missing Column Headers",
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  };

  return result;
}

module.exports = checkColumnHeaders;