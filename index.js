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

/**
 * Simple test to count and display the number of rows
 * @param  {Array}
 * @return {Object}
 */
function numberOfRows(rows) {
  var message = "This spreadsheet has " + rows.length + " rows"
  var template = _.template(`
    <span class="test-header">This spreadsheet has <%= rows %> rows</span>
  `)({ rows: rows.length })
  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(numberOfRows)

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
  });
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
  <span class="test-header">Empty Cells</span><br/>
  <% _.forEach(cols, function(col) { %>
    We found <span class="test-value"><%= nothing[col] %></span> empty cells for column <span class="test-column"><%= col %></span><br/>
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
  <span class="test-header">Numeric Cells</span><br/>
  <% _.forEach(cols, function(col) { %>
    We found <span class="test-value"><%= numbers[col] %></span> cells with a numeric value for column <span class="test-column"><%= col %></span><br/>
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
 * Check for column headers in spreadsheet-like data
 * Do all columns have a string indicating the nature of the data column?
 * **Assumptions**: Without column headers, it can be difficult to discern the nature of a dataset.
 *
 * @param  {Array} The rows of the spreadsheet parsed out
 * @param  {String} The raw string of the file
 * @return {Object} The result of the test
 * @example
 * columnHeads({'': 'foo@whitehouse.gov', 'name': 'Jane Smith'});
 * // {"passed":false, "message": , "template": }
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

  var message = "Columns without headers:<br/> ";
  columnHeads.forEach(function(columnHead, index) {
    message += "column " + index
    if(i < columnHeads.length-1) message += "<br/> "
  })
  var template = ;

  var result = {
    passed: isPassed,
    message: message,
    template: template
  };

  return result;
}
exports.tests.push(checkColumnHeaders)

