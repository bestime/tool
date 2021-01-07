const clone = require('./clone')

/**
 * 获取两个数组中的差异项
 * 请确认传入参数数据类型的准确性，函数内部不做类型处理
 * 
 * @param {Array} a 数组一
 * @param {Array} b 数组二
 * @param {Function<Boolean>} [comparison(v1, v2)] 每一项的回调函数，比较两个值是否相等，返回值为boolean类型
 * 
 * @return [Array<newA, newB>] 如果返回的两个数组都为空，则表示传入的两个数组相同
 * 
 */

function differenceCollect(a, b, comparison) {
  var index1, item1, differ1 = clone(a);
  var index2, item2, differ2 = clone(b);
  
  for(index1 = differ1.length - 1; index1 >= 0; index1--) {
    for(index2 = differ2.length - 1; index2 >= 0; index2--) {
      item1 = differ1[index1]
      item2 = differ2[index2]
      if(comparison ? comparison(item1, item2) : item1 === item2) {
        differ1.splice(index1, 1)
        differ2.splice(index2, 1)
        break;
      }
    }
  }

  return [differ1, differ2]
}

module.exports = differenceCollect