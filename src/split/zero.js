

const _String = require('./_String')
const _Number = require('./_Number')

function zero (num, seat) {
  num = _Number(num)
  seat = _String(seat) || '00'
  switch(seat.length) {
    case 3:
      if(num < 10) {
        num = `00${num}`
      } else if(num < 100) {
        num = `0${num}`
      }
      break;
    default:
      num = num < 10 ? `0${num}` : num
  }
  return num
}

module.exports = zero