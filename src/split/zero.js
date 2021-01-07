

const _String = require('./_String')

/**
 * 数字补0。比如：1 => 01
 * @param {Number|String} num 需要处理的数字
 * @param {Number|String} seat 总占几位
 * 
 * @return {String}
*/
function zero (num, seat) {
  num = _String(num)
  var diff;
  if(typeof seat === 'number') {
    diff = seat - num.length
  } else {
    seat = _String(seat)
    diff = seat.length - num.length
  }
  
  if(diff) {
    for(var a = 0; a < diff; a++) {
      num = '0' + num
    }
  } else {
    num = _String(Number(num))
  }
  return num
}

module.exports = zero