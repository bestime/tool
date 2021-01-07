

const isEmpty = require('./isEmpty')
const _Object = require('./_Object')

//删除cookie
function removeCookie (key, opt) {
  opt = _Object(opt)
  opt.path = '/'

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

    // console.log('cooke测试', str)
    document.cookie = str        
  }
}

module.exports = removeCookie
