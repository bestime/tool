//设置cookie 
// t 单位（毫秒）
function setCookie (key, value, t){
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + t);
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
  // 不能这样写[目前知道百度浏览器这样写会有bug，获取cookie【document.cookie】的时候会把cookie删除]，一定要像下面这样写
  // oDate = oDate.toGMTString(); 
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
  document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString();
}

module.exports = setCookie
