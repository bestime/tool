var filterText = (function () {
  function convertText (data) {
    if(typeof data !== 'string') {
      return ''
    } else {
      data = data.replace(/\(/g, '\\(')
      data = data.replace(/\)/g, '\\)')
      data = data.replace(/\+/g, '\\+')
      data = data.replace(/\？/g, '\\？')
      data = data.replace(/\?/g, '\\?')
      data = data.replace(/\*/g, '\\*')
      data = data.replace(/\^/g, '\\^')
      data = data.replace(/\!/g, '\\!')
      return data
    }
  }

  function getType (data) {
    return Object.prototype.toString.call(data).replace(/(.*\s)|.$/g, '')
  }

  function trim (str, pos) {
    if(getType(str)==='Array') return typeof str
    str = str == null ? '' : String(str)
    switch (pos) {
      case 1: return str.replace(/^[\s\uFEFF\xA0]+/, '');
      case -1: return str.replace(/[\s\uFEFF\xA0]+$/, '')
      case '*': return str.replace(/[\s\uFEFF\xA0]+/g, '');
      default: return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    }
  }

  function some (arr, handle) {
    var res = false;
    if(arr && arr.length) {
      for(var a = 0, len = arr.length; a < len; a++) {
        if(handle(arr[a], a, arr) === true) {
          res = true
          break;
        }
      }
    }    
    return res
  }

  return function (list, search) {
    var oldStr = search;
    var index, len, item, res = [];
    var temSearch;
    // 去除所有空格
    search = trim(search, '*')
    var prefix
    // return clone(list)
    if(search) {
      for(index = 0, len = list.length; index < len; index++) {
        // item = clone(list[index])
        item = list[index]
        item.count = 0
        item.startIndex = -1
        search = oldStr
        // 先找一次完全匹配的
        some(item.spell, function (smItem, sidx) {
          if(!smItem.count) {
            smItem.checked = false
          }
          
          if(smItem.count) return false;
          if(item.startIndex > sidx) return;

          // 找拼音
          some(smItem.key, function (target) {
            temSearch = search.replace(new RegExp('^' + convertText(target)), '')
            if(temSearch !== search) {
              search = temSearch
              addOne(item, smItem,sidx)
              return true;
            }
          })
        })
        reduceOnce();
        function reduceOnce () {
          if(!search) return;
          
          if(!some(item.spell, function (smItem, sidx) {
            prefix = search[0]
            if(smItem.count) return false;
            if(item.startIndex > sidx) return false;
            some(smItem.key, function (target) {
              if(target[0] === prefix) {
                search = search.replace(new RegExp('^' + convertText(prefix)), '')
                addOne(item, smItem, sidx)
                return true;
              }
            })
          })) {
            search = search.substr(1)
          }          
          reduceOnce()
        }

        function addOne (one, child, cidx) {
          child.checked = true
          one.startIndex = cidx
          if(!one.count) {
            one.count = 1
            res.push(one)
          } else {
            one.count++
          }
        }
      }
    } else {
      for(var a=0; a<list.length; a++) {
        list[a].count = 0
        list[a].startIndex = -1
        if(list[a].spell) {
          for(var b=0;b<list[a].spell;b++) {
            list[a].spell[b].checked = false
          }
        }
      }
      res = list
    }

    return res
  }
})();



self.onmessage = function (ev) {
  var res = ev.data
  var list = res.old.concat(filterText(res.list, res.text))
  list.sort(function (a, b) {
    return (a.count / a.spell.length) > (b.count / b.spell.length) ? -1 : 1
  })
  // console.log('数据x：')
  self.postMessage(list);
}

