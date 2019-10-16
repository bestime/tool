const forEach = require('./forEach')
const isFunction = require('./isFunction')
const _Number = require('./_Number')

function getMinAndMax (arr, handle) {
  var min, max, val, maxItem, minItem, sum = 0;
  forEach(arr, function (item) {
    val = _Number(isFunction(handle) ? handle(item) : val)
    sum += _Number(val)
    if(typeof max === 'undefined' || max < val) {
      max = val
      maxItem = item
    }

    if(typeof min === 'undefined' || min > val) {
      min = val
      minItem = item
    }
  })
  
  return {
    min: minItem,
    max: maxItem,
    sum: sum
  }
}

module.exports = getMinAndMax