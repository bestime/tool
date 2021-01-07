import _String from './_String'

/*

_Url('/a/b////c/.jpg', 'http://192.168.0.232:8099')
_Url('adc.jpg', 'http://192.168.0.232:8099')
_Url('adc.jpg', './')
_Url('images/devices/fans/1/static.png', './')
_Url('/a/b////c/.jpg', 'http://192.168.0.232:8099////')
_Url('http://www.baidu.com/a.jpg', 'http://192.168.0.232:8099')

*/


//////////////////////////////////////////////////////////
/**
 * 强制转url。补全前缀，通常用于后端返回图片地址是否完整
 * @param {String} originUrl 需要处理的url
 * @param {String} originPrefix 如果url不完整，则使用此前缀
 * @return {String} 处理后的url
 */
export default function _Url (originUrl, originPrefix) {
  var url = _String(originUrl)
  var prefix = _String(originPrefix)
  if(!/https?:\/\//.test(url)) {
    url = url.replace(/\/+/g, '/')
    prefix = prefix.replace(/\/+$/, '')
    if(!/^\//.test(originUrl)) {
      prefix += '/'
    }
  } else {
    prefix = ''
  }

  url = prefix + url

  // console.log(`【${originPrefix}】【${originUrl}】 =>`, url)
  return url
}