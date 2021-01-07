const _Number = require('./_Number')

function numberLimit (start, end) {
  start = _Number(start)
  end = _Number(end)
  return function (target) {
    target = _Number(target)
    if(target < start) {
      target = start
    } else if(target > end) {
      target = end
    }
    return target
  }
}

module.exports = numberLimit