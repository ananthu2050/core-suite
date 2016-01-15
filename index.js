// Require modules needed for tests.
_ = require('lodash');

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
    passed: false,
    // potential ways of reporting problems
    // we probably just want to use indexes into the dataset
    invalidRows: [1, 55, 200],
    invalidColumns: ['State', 'zipcode'],
    invalidCells: [ [0, 0], [100, 234], [ 55, 60 ]]
  };
  return result;
}
// We don't actually want to run this test, but if we did we would push it to the tests
//exports.tests.push(fooBar)


/**
 * Determine the percentage of rows that are empty for each column
 * @param  {Array} the rows of the spreadsheet
 * @return {Object} the result
 */
function columnsContainNothing(rows) {
  // TODO: should we pass in the columns?
  // when using d3 it will include one of each detected column for all rows
  // so we have it implicitly. we may want to be more explicit
  var cols = Object.keys(rows[0]);
  var nothing = {};
  cols.forEach(function(col) {
    nothing[col] = 0;
  })
  // look through the rows
  rows.forEach(function(row) {
    cols.forEach(function(col) {
      var cell = row[col];
      if(cell === "") { 
        nothing[col] += 1;
      }
    })
  })

  var message = ", ";
  cols.forEach(function(col, i) {
    message += col + ": " + nothing[col]
    if(i < cols.length-1) message += ", "
  })

  var template = _.template(`
  <span class="test-header"># of rows for each column with no value:</span><br/>
  <% _.forEach(cols, function(col) { %>
    <span class="test-column"><%= col %></span>: <span class="test-value"><%= nothing[col] %></span><br/>
  <% }) %>
  `)({ cols: cols, nothing: nothing })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: nothing,
    message: message, // for console rendering
    template: template,
  }
  return result;
}
exports.tests.push(columnsContainNothing)


/**
 * Determine the percentage of rows that are numbers for each column
 * @param  {Array} the rows of the spreadsheet
 * @return {Object} the result
 */
function columnsContainNumbers(rows) {
  var cols = Object.keys(rows[0]);
  var numbers = {};
  cols.forEach(function(col) {
    numbers[col] = 0;
  })
  // look through the rows
  rows.forEach(function(row) {
    cols.forEach(function(col) {
      var cell = row[col];
      var f = parseFloat(cell);
      if(f.toString() === cell) { // this will only be true if the cell is a number
        numbers[col] += 1;
      }
    })
  })

  var message = "# of rows for each column with number values:<br/> ";
  cols.forEach(function(col, i) {
    message += col + ": " + numbers[col]
    if(i < cols.length-1) message += "<br/> "
  })

  var template = _.template(`
  <span class="test-header"># of rows for each column with a number value:</span><br/>
  <% _.forEach(cols, function(col) { %>
    <span class="test-column"><%= col %></span>: <span class="test-value"><%= numbers[col] %></span><br/>
  <% }) %>
  `)({ cols: cols, numbers: numbers })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: numbers,
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(columnsContainNumbers)


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

