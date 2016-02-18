// All test suites will have a name and a list
exports = module.exports = {
  name: "dataproofer-core-suite",
  tests: [],      // the list of main tests to be run in the suite
  subtests: [],   // a list of tests that can be triggered by the main tests but wont be run automatically
}

/**
 * This fooBar function is a placeholder to demonstrate what a test can expect
 * @param  {Array} The rows of the spreadsheet parsed out
 * @param  {String} The raw string of the file
 * @param  {Object} User defined input
 * @return {Object} The result of the test
 */
function fooBar(rows, str, input) {
  console.log("fooing some bars", rows.length)
  var result = {
    // whether or not the
    passed: false, // REQUIRED FOR RESULT API
    // potential ways of reporting problems
    // we probably just want to use indexes into the dataset
    invalidRows: [1, 55, 200],
    invalidColumns: ['State', 'zipcode'],
    invalidCells: [ [0, 0], [100, 234], [ 55, 60 ]],
    message: "You foo'd up", // REQUIRED FOR RESULT API
    template: _.template(`<span class="test-header">foooooo: <%= foo %></span>`)({ foo: 100}) // REQUIRED FOR RESULT API define template and compile it to html
  };
  return result;
}
// We don't actually want to run this test, but if we did we would push it to the tests
//exports.tests.push(fooBar)

var numberOfRows = require('./src/numberOfRows');
var numberOfRowsIs65k = require('./src/numberOfRowsIs65k');
var columnsContainNothing = require('./src/columnsContainNothing');
var columnsContainNumbers = require('./src/columnsContainNumbers');
var stringsHaveExactly255Characters = require('./src/stringsHaveExactly255Characters');
var checkDuplicateRows = require('./src/checkDuplicateRows');

exports.tests.push(
  numberOfRows,
  numberOfRowsIs65k,
  checkDuplicateRows,
  columnsContainNothing
  // columnsContainNumbers,
  // stringsHaveExactly255Characters
);
