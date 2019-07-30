

const isEmpty = require('./isEmpty')
const _Object = require('./_Object')

//删除cookie
function removeCookie (key, opt) {
  opt = _Object(opt)    
  if(isEmpty(opt)) {
    toClear()
  }else {
    for(var pk in opt) {
      toClear(pk, opt[pk]) 
    }
  }
    
  function toClear (part, partVal) {
    var oDate = new Date();
    oDate.setTime(oDate.getTime() - 10000000);
    var str = key + '=' + encodeURI('') + ';expires=' + oDate.toGMTString();
    if(part) {
      str = str +  ';' + part + '=' + partVal;
    }
    document.cookie = str        
  }
}

module.exports = removeCookie
