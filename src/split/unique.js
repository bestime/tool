const forEach = require('./forEach')
const getType = require('./getType')




/**
 * 数组去重，返回新数组
 * @param {Array} arr 需要去重的数组
 * @param {Boolean} vague [可选]是否模糊去重; 默认：false; false: [3, '3'] => [3,'3']; true: [3, '3'] => [3];
 * @param {?:Function} 循环处理函数，返回比较的key
 */

function unique (arr, vague, handle) {
  var res = [], exist = {}, checkKey;
  forEach(arr, function (item) {
    checkKey = getType(handle) === 'Function' ? handle(item) : item
    checkKey = getType(checkKey) === 'Number' || vague ? checkKey : `"${checkKey}"`
    if(!exist[checkKey]) {      
      exist[checkKey] = true;
      res.push(item);
    }
  })

  return res;
}


module.exports = unique