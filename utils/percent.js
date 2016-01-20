var d3 = require('d3');

function percent(fraction) {
  var formatPercent = d3.format('.2f')
  return formatPercent(100*fraction) + "%";
}

module.exports = percent;