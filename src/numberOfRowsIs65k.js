var _ = require('lodash');

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

module.exports = numberOfRowsIs65k;