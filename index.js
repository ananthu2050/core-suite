// Require modules needed for tests.
_ = require('lodash');

// All test suites will have a name and a list 
exports = module.exports = {
  name: "dataproofer-core-suite",
  tests: [],      // the list of main tests to be run in the suite
  subtests: [],   // a list of tests that can be triggered by the main tests but wont be run automatically
}

function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
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
    invalidCells: [ [0, 0], [100, 234], [ 55, 60 ]],
    message: "You foo'd up",
    template: _.template(`<span class="test-header">foooooo: <%= foo %></span>`)({ foo: 100}) //define template and compile it to html
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
    <span>This spreadsheet has <%= rows %> rows</span>
  `)({ rows: rows.length })
  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    title: "Number of rows",
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(numberOfRows)


/**
 * Test to see if # of rows is exactly 65,536 rows (cutoff by Excel)
 * @param  {Array}
 * @return {Object}
 */
function numberOfRowsIs65k(rows) {
  var message, template, passed;
  if(rows.length === 65536 || rows.length === 65535) { // including both for now, not clear if header row should be included
    message = "Warning: This spreadsheet has " + rows.length + " rows, a common cutoff point for Excel indicating your dataset may be missing rows."
    template = _.template(`
      <span class="warning">This spreadsheet has <%= rows %> rows, a common cutoff point for Excel indicating your dataset may be missing rows.</span>
    `)({ rows: rows.length })
    passed = false;
  } else {
    passed = true;
    message = "No anomolies detected"
  }
  
  var result = {
    passed: passed, // this doesn't really fail, as it is mostly an insight
    title: "Potentially missing rows",
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(numberOfRowsIs65k)

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

  var cells = [] // we will want to mark cells to be highlighted here
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    cols.forEach(function(col) {
      var cell = row[col];
      if(cell === "") { 
        nothing[col] += 1;
        crow[col] = 1;
      } else {
        crow[col] = 0;
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var message = ", ";
  cols.forEach(function(col, i) {
    message += col + ": " + nothing[col]
    if(i < cols.length-1) message += ", "
  })

  var template = _.template(`
  <% _.forEach(cols, function(col) { %>
    <% if(nothing[col]) { %>
    We found <span class="test-value"><%= nothing[col] %></span> empty cells (<%= percent(nothing[col]/rows.length) %>) for column <span class="test-column"><%= col %></span><br/>
    <% } %>
  <% }) %>
  `)({ cols: cols, nothing: nothing, rows: rows, percent: percent })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: nothing,
    title: "Empty Cells",
    highlightCells: cells,
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
  var cells = [] // we will want to mark cells to be highlighted here
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    cols.forEach(function(col) {
      var cell = row[col];
      var f = parseFloat(cell);
      if(f.toString() === cell) { // this will only be true if the cell is a number
        numbers[col] += 1;
        crow[col] = 1
      } else {
        crow[col] = 0
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var message = "# of rows for each column with number values:<br/> ";
  cols.forEach(function(col, i) {
    message += col + ": " + numbers[col]
    if(i < cols.length-1) message += "<br/> "
  })

  var template = _.template(`
  <% _.forEach(cols, function(col) { %>
    <% if(numbers[col]) { %>
    We found <span class="test-value"><%= numbers[col] %></span> cells (<%= percent(numbers[col]/rows.length) %>) with a numeric value for column <span class="test-column"><%= col %></span><br/>
    <% } %>
  <% }) %>

  `)({ cols: cols, numbers: numbers, rows: rows, percent: percent })

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    numbers: numbers,
    title: "Numeric Cells",
    highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(columnsContainNumbers)


/**
 * Determine the cells that have exactly 255 characters (SQL upper limit error)
 * @param  {Array} the rows of the spreadsheet
 * @return {Object} the result
 */
function stringsHaveExactly255Characters(rows) {
  var cols = Object.keys(rows[0]);
  var strings = {};
  cols.forEach(function(col) {
    strings[col] = 0;
  })
  var cells = [] // we will want to mark cells to be highlighted here
  var has255 = false
  // look through the rows
  rows.forEach(function(row) {
    var crow = {} // we make a row to keep track of cells we want to highlight
    cols.forEach(function(col) {
      var cell = row[col];
      if(cell.length === 255) {
        crow[col] = 1
        strings[col] += 1
        has255 = true; // we want to know if it occurrs at least once
      } else {
        crow[col] = 0
      }
    })
    cells.push(crow) // push our marking row onto our cells array
  })

  var message, template, passed;
  if(has255) {
    passed = false
    message = "Warning: we found strings that are exactly 255 characters long. This can indicate an error with a SQL export: ";
    cols.forEach(function(col, i) {
      message += col + ": " + strings[col]
      if(i < cols.length-1) message += "<br/> "
    })

    template = _.template(`Warning: we found strings that are exactly 255 characters long. This can indicate an error with a SQL export:<br/>
    <% _.forEach(cols, function(col) { %>
      <% if(strings[col]) { %>
      We found <span class="test-value"><%= strings[col] %></span> cells (<%= percent(strings[col]/rows.length) %>) with 255 character-length strings for column <span class="test-column"><%= col %></span><br/>
      <% } %>
    <% }) %>
    `)({ cols: cols, strings: strings, rows: rows, percent: percent })

  } else {
    passed = true;
    message = "No anomolies found with character lengths of cells";
  }

  var result = {
    passed: true, // this doesn't really fail, as it is mostly an insight
    title: "Strings with 255 Characters (SQL upper limit error)",
    highlightCells: cells, // a mirror of the dataset, but with a 1 or 0 for each cell if it should be highlighted or not
    message: message,
    template: template
  }
  return result;
}
exports.tests.push(stringsHaveExactly255Characters)


/** 
 * @param  {Array} The rows of the spreadsheet parsed out
 * @param  {String} The raw string of the file
 * @return {Object} The result of the test
 */
function checkColumnHeaders(rows, str) {
  console.log("checking column headers", rows.length)
  var result = {
    title: "Column Headers"
  };
  return result;
}
exports.tests.push(checkColumnHeaders)

