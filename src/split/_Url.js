/**
 * 强制转url。补全前缀，通常用于后端返回图片地址是否完整
 * @param {String} url 需要处理的url
 * @param {String} url的前缀，如果url不完整，则使用此前缀
 */
function _Url (url, prefix) {
  url = String(url)
  if(!/https?:\/\//.test(url)) {
    prefix = prefix.replace(/\/+$/, '')
    url = prefix + url.replace(/^\/\/+/, '')
  }
  return url
}

module.exports = _Url