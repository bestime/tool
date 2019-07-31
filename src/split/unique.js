

/**
 * 数组去重，返回新数组
 * @param {Array} arr 需要去重的数组
 * @param {Boolean} vague [可选]是否模糊去重; 默认：false; false: [3, '3'] => [3,'3']; true: [3, '3'] => [3];   
 */

function unique (arr, vague) {
  var res = [],
      exist = {},
      index = 0,
      len = arr.length,
      item,
      keyName;
  while (index < len) {
    item = arr[index]
    keyName = typeof item === 'number' || vague ? item : `"${item}"`
    if(!exist[keyName]) {
      exist[keyName] = true;
      res.push(item);
    }
    index++;
  }
  return res;
};

module.exports = unique