const _String = require('./_String')
/**
 * 字符串按次数复制
 * @param {String} target 需要复制的字符串，或像字符串数字
 * @param {Number} count <正整数> 复制几次（包含了自身的一次）
 * 
 * @return {String}
 * 
 */
function repeatString (target, count) {
  var res = '';
  target = _String(target)
  if (target.length * count < 1 << 28) {
    for (;;) {
      if ((count & 1) == 1) {
        res += target;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      target += target;
    }
  }
  return res;
}

module.exports = repeatString