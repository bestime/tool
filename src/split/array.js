
const isNumber = require('./isNumber')
const isArray = require('./isArray')


/**
 * 复制数组到指定长度 
 */
function replenish () {
  var arr = arguments
  var len = arr.length
  var hasNumber = isNumber(arr[len - 1]);
  var end = hasNumber ? len - 1 : len
  var res = arr[0]
  var num = hasNumber ? arr[len - 1] : 0
  
  if(isArray(res)) {
    for(var a=1; a < end; a++) {
      res = res.concat(arr[a])
    }
  }

  if(num > res.length) {
    var addNum;
    (function add() {
      addNum = res.length
      if(addNum + res.length > num) {
        addNum = num - res.length
      }
      res = res.concat(res.slice(0, addNum))
      if(res.length < num) {
        add()
      }
    })()
  }

  return res
}

module.exports = {
  replenish: replenish
}
