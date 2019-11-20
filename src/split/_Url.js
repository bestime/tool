const _String = require('./_String')

/**
 * 强制转url。补全前缀，通常用于后端返回图片地址是否完整
 * @param {String} url 需要处理的url
 * @param {String} prefix 如果url不完整，则使用此前缀
 * @return {String} 处理后的url
 */
function _Url (url, prefix) {
  url = _String(url)
  prefix = _String(prefix)
  if(!/https?:\/\//.test(url)) {
    prefix = prefix.replace(/\/+$/, '')
    url = prefix + url.replace(/^\/\/+/, '')
  }
  return url
}

module.exports = _Url