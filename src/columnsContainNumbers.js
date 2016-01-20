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

module.exports = columnsContainNumbers;