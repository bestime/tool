/**
 * 数组乱序
 * @param {Array} list
 * @return {Array}
 */
function shuffle (list) {
  for (var idx, temp, len = list.length; len; len--) {
    idx = Math.floor(Math.random() * len)
    temp = list[len - 1]
    list[len - 1] = list[idx]
    list[idx] = temp
  }
  return list;
}


module.exports = shuffle