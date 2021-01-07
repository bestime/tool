
/**
 * url强制转换http或https
 * @param {String} url 可能不规则的url链接
 * @param {String} mode 模式：http或者https
 * 
 * @return {String} 处理后的字符串
 */
export default function $HTTP (url, mode) {
  let find, res = String(url).replace(/.*?(?=:\/\/)/, function (pre) {
    find = true
    return /http/.test(pre) ? mode : pre
  });
  return find ? res : mode + '://' + url
}
