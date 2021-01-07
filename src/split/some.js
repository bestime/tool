

/**
 * some 兼容版
 * @param {Array} list
 * @param {Function} handle
 * 
 * @return {Boolean}
 */
function some (list, handle) {
  var res = false, len = list.length;
  for(var a = 0; a < len; a++) {
    if(handle(list[a], a, list) === true) {
      res = true
      break;
    }
  }
  
  return res
}

module.exports = some