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

module.exports =  columnsContainNothing;