// Require modules needed for tests.
_ = require('lodash');

// All test suites will have a name and a list 
exports = module.exports = {
  name: "dataproofer-core-suite",
  tests: []
}

/** 
 * @param  {Array} The rows of the spreadsheet parsed out
 * @param  {String} The raw string of the file
 * @return {Object} The result of the test
 */
function checkColumnHeaders(rows, str) {
  console.log("checking column headers", rows.length)
  var result = {};
  return result;
}
exports.tests.push(checkColumnHeaders)

function fooBar(rows) {
  console.log("fooing some bars", rows.length)
  var result = {};
  return result;
}
exports.tests.push(fooBar)