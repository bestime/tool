

const _String = require('./_String')
const _Number = require('./_Number')

function zero (num) {
  num = _Number(num)
  return num < 10 ? `0${num}` : _String(num)
}

module.exports = zero