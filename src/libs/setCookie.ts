import setObjectToString from './help/hpSetObjectToString'

/**
 * 设置cookie。默认path="/"
 * @param {String} key 设置的键名
 * @parrm {*} value 设置的值
 * @param {Number} t 单位（毫秒）
 */
export default function setCookie (key: string, value: any, t?: number){
  value = setObjectToString(value)
  const hasExpireTime = t && t>0
  var oDate = new Date();
  if(hasExpireTime) {
    oDate.setTime(oDate.getTime() + t);
  }
  let cook = key + '=' + encodeURI(value) + ';path=\/;'

  if(hasExpireTime) {
    cook += 'expires=' + oDate.toUTCString();
  }
  
  // 不能这样写[目前知道百度浏览器这样写会有bug，获取cookie【document.cookie】的时候会把cookie删除]，一定要像下面这样写
  // oDate = oDate.toGMTString(); 
  document.cookie = cook
}
