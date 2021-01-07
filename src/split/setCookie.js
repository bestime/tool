import SET_STRING_VALUE from './SET_STRING_VALUE'

/**
 * 设置cookie。默认path="/"
 * @param {String} key 设置的键名
 * @parrm {*} value 设置的值
 * @param {Number} t 单位（毫秒）
 */
export default function setCookie (key, value, t){
  value = SET_STRING_VALUE(value)
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + t);
  // 不能这样写[目前知道百度浏览器这样写会有bug，获取cookie【document.cookie】的时候会把cookie删除]，一定要像下面这样写
  // oDate = oDate.toGMTString(); 
  document.cookie = key + '=' + encodeURI(value) + ';path=\/;expires=' + oDate.toGMTString();
}
