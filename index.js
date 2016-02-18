// All test suites will have a name and a list
exports = module.exports = {
  name: "dataproofer-core-suite",
  tests: [],      // the list of main tests to be run in the suite
  subtests: [],   // a list of tests that can be triggered by the main tests but wont be run automatically
}

var numberOfRows = require('./src/numberOfRows');
var numberOfRowsIs65k = require('./src/numberOfRowsIs65k');
var columnsContainNothing = require('./src/columnsContainNothing');
var columnsContainNumbers = require('./src/columnsContainNumbers');
var stringsHaveExactly255Characters = require('./src/stringsHaveExactly255Characters');
var checkDuplicateRows = require('./src/checkDuplicateRows');

exports.tests.push(
  numberOfRows,
  numberOfRowsIs65k,
  checkDuplicateRows
  // columnsContainNothing,
  // columnsContainNumbers,
  // stringsHaveExactly255Characters
);
