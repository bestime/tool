

const _String = require('./_String')

function zero (num, seat) {
  num = _String(num)
  seat = _String(seat)
  var diff = seat.length - num.length
  if(diff) {
    for(var a=0; a<diff; a++) {
      num = '0' + num
    }
  } else {
    num = _String(Number(num))
  }
  return num
}

module.exports = zero