function assembly (arr, num, handleGroup) {
  var count = 0, start = +new Date();
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
  console.log('次数：', count, +new Date() - start)
  return res;
}

module.exports = assembly