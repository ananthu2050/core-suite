// Require modules needed for tests.
//_ = require('lo-dash');

// All test suites will have a name and a list 
exports = module.exports = {
  name: "dataproofer-core-suite",
  tests: []
}

exports.tests.push(checkColumnHeaders)
function checkColumnHeaders(rows) {
  console.log("checking column headers", rows.length)
  var result = {};
  return result;
}

exports.tests.push(fooBar)
function fooBar(rows) {
  console.log("fooing some bars", rows.length)
  var result = {};
  return result;
}