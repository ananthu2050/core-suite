var _ = require('lodash');

/** 
 * Check for column headers in spreadsheet-like data
 * Do all columns have a string indicating the nature of the data column?
 * **Assumptions**: Without column headers, it can be difficult to discern the nature of a dataset.
 *
 * @param  {Array} The rows of the spreadsheet parsed out
 * @param  {String} The raw string of the file
 * @return {Object} The result of the test
 * @example
 * columnHeads({'': 'foo@whitehouse.gov', 'name': 'Jane Smith'});
 * // {"passed":false, "consoleMessage": , "htmlTemplate": _.comple('<%= missingHeadersCount %>');}
 */
function checkColumnHeaders(rows, str) {
  console.log("checking column headers", rows.length);
  var columnHeads = Object.keys(rows[0]);
  var noHeader = {};
  columnHeads.forEach(function(columnHead, index) {
    noHeader[index] = columnHead;
  });
  var totalColumnsCount = columnHeads.length;
  var missingHeadersCount;
  var isPassed;

  for (var i = 0; i < columnHeads.length; i++) {
    var currentItem = columnHeads[i];
    if (currItem.length === 0) {
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