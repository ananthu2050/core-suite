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
  console.log("checking column headers", rows.length);
  var noHeader = {};
  columnHeads.forEach(function(columnHead, index) {
    noHeader[index] = columnHead;
  });
  var totalColumnsCount = columnHeads.length;
  var missingHeadersCount;
  var isPassed;

  for (var i = 0; i < columnHeads.length; i++) {
    var currentItem = columnHeads[i];
    if (currentItem.length === 0) {
      missingHeadersCount += 1;
    }
  }

  if (missingHeadersCount > 0) {
    isPassed = false;
  } else {
    isPassed = true;
  }

  var consoleMessage = "Columns without headers:<br/> ";
  columnHeads.forEach(function(columnHead, index) {
    consoleMessage += "column " + index
    if(i < columnHeads.length-1) consoleMessage += "<br/> "
  })
  var htmlTemplate;

  var result = {
    passed: isPassed,
    consoleMessage: consoleMessage,
    htmlTemplate: htmlTemplate
  };

  return result;
}

module.exports = checkColumnHeaders;