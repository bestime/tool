import setObjectToString from './help/hpSetObjectToString'

/**
 * 设置cookie。默认path="/"
 * @param key - 设置的键名
 * @param value - 设置的值
 * @param expiredTime - 单位（毫秒）
 */
export default function setCookie (key: string, value: string, expiredTime?: number){
  value = setObjectToString(value)
  let cook = key + '=' + encodeURI(value) + ';path=\/;'
  if(typeof expiredTime === 'number') {
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + expiredTime);
    cook += 'expires=' + oDate.toUTCString();
  }
  document.cookie = cook
}
