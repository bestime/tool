import setObjectToString from './help/hpSetObjectToString'

/**
 * 设置cookie。默认path="/"
 * @param {String} key 设置的键名
 * @parrm {*} value 设置的值
 * @param {Number} t 单位（毫秒）
 */
export default function setCookie (key: string, value: any, t?: number){
  value = setObjectToString(value)
  t = t || 0
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + t);
  let cook = key + '=' + encodeURI(value)
  cook += ';path=\/;expires=' + oDate.toUTCString();
  // console.log("dd", cook)
  document.cookie = cook
}
