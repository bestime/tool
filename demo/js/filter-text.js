/**
 * 文本筛选
 * @param {Array<Map>} 目标数组
 * @param {String} 搜索的文本
 * 
 */

/*


*/

var filterText = (function () {
  function deleteSame (target, str) {
    var res = '';
    if(str.length > target.length) {
      res = str.replace(new RegExp('^' + target), '')
    }
    return res;
  }
  return function (list, search) {
    var index, len, item, res = [], last, reg, key, temp = [], resMap = {}, find, first;
    var spellItem, spelIndex, spellLen;
    // 去除所有空格
    search = String(search).replace(/[\s\uFEFF\xA0]/g, '')
    if(search) {
      ;(function handle () {
        for(index = 0, len = list.length; index<len; index++) {
          item = list[index]
          for(spelIndex = 0, spellLen = item.spell.length; spelIndex < spellLen; spelIndex++) {
            spellItem = item.spell[spelIndex]
            // console.log('正则:', search)
            if(new RegExp(search).test(spellItem.key) || new RegExp(spellItem.key).test(search)) {
              // console.log('1111', search)
              search = deleteSame(spellItem.key, search)
              finded()
              break;
            } else {
              first = spellItem.key.substr(0, 1)
              reg = new RegExp(first)
              // console.log('2222', search)
              if(search[0] == first) {
                finded()
                break;
              }
            }

            function finded () {
              if(temp[index]) {
                console.log('spellItem', spellItem)
                temp[index][spelIndex] = true
              } else {
                temp[index] = []
                temp[index][spelIndex] = true
                search = deleteSame(spellItem.key, search)
                res.push(item)
              }
              
            }
          }
        } 
      })(0);
    } else {
      res = list;
    }

    console.log('res', temp)
    return res
  }
})();