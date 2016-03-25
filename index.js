// All test suites will have a name and a list
exports = module.exports = {
  name: "dataproofer-core-suite",
  fullName: "Core Data Tests",
  tests: [],      // the list of main tests to be run in the suite
  subtests: [],   // a list of tests that can be triggered by the main tests but wont be run automatically
}

var checkDuplicateRows = require('./src/checkDuplicateRows');
var integerEquals2097152 = require('./src/integerEquals2097152');
var numberOfRowsIs65k = require('./src/numberOfRowsIs65k');
var stringsHaveExactly255Characters = require('./src/stringsHaveExactly255Characters');

exports.tests.push(
  numberOfRowsIs65k,
  checkDuplicateRows,
  stringsHaveExactly255Characters,
  integerEquals2097152
);
