
/**
 * 组合所有肯能性 
 */
function assembly (arr, num, handleGroup) {
  var count = 0, begin = +new Date();
  var res = (function toFind(arr, length, start, coll){
    var res = []
    count++
    for(var index = start; index < arr.length; index++) {
      if (length > 1)  {
        res = res.concat(toFind(arr, length - 1, index + 1, coll.concat(arr[index])))
      } else {
        res.push(typeof handleGroup === 'function' ? handleGroup(coll.concat(arr[index]), index) : coll.concat(arr[index]))
      }     
    }
    return res
  })(arr, num, 0, []);
  console.log('次数：', count, '用时：', +new Date() - begin)
  return res;
}

module.exports = assembly



/**
 * ns.assembly(['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'p', 'q'], 9, g => g.join(''))
 */