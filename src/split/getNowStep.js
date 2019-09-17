const _Number = require('./_Number')
const forEach = require('./forEach')
const isFunction = require('./isFunction')

function getNowStep (arr, now, handle) {
  var one, findIndex = -1;
  now = _Number(now)
  forEach(arr, function (item, index) {
    if(isFunction(handle)) {
      one = _Number(handle(item))
    } else {
      one = _Number(item)
    }
    if(now >= one) {
      findIndex = index 
    }
  })
  return {
    index: findIndex,
    pre: arr[findIndex],
    next: arr[findIndex + 1]
  }
}

module.exports = getNowStep