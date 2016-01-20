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