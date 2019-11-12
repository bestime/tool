const getRandom = require('./getRandom')

/**
 * 从数组中取随机值
 * @param  {Array} arr 目标数组
 * @param  {Number} num 取的个数
 * @return {Array}
 */
function getRandomArray (arr, num) {
  var usedIndex = {}, res = [], rdIdx;
  function add () {
    if(res.length < num && res.length < arr.length) {
      rdIdx = getRandom(0, arr.length - 1)
      if(usedIndex[rdIdx]) {
        add()
      } else {
        res.push(arr[rdIdx])
        usedIndex[rdIdx] = true
        add()
      }
    }
  }

  add()

  // 长度不够就随机生成数据
  for(var a = res.length; a<num; a++) {
    res.push('R_'  + a)
  }
  
  return res
}

module.exports = getRandomArray