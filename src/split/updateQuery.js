/**
 * 更新序列化字符串参数，如果字段不存在，则新增字段
 * @param {String} updateKey 更新字段
 * @param {String} [updateValue=null] 更新值
 * @param {String} [str=window.location.href]需要更新的字符串
 * 
 * @return {String}
 */

function updateQuery (updateKey, updateValue, str) {
  updateValue = updateValue == null ? '' : encodeURI(updateValue)
  
  var href = '', isfind, oldUrl;
  try { href = window.location.href } catch (e) {};
  oldUrl = typeof str === 'string' ? str : href 
  // 尝试修改旧参数
  var res = oldUrl.replace(new RegExp('([?&]'+ updateKey +'=)([^=&?/#]*)', 'g'), function (_, $1) {
    isfind = true
    if(updateValue==='') {
      return /\?/.test($1) ? '?' : ''
    } else {
      return $1 + updateValue
    }
  })

  // 追加新参数
  if(!isfind && updateValue !=='') {
    var newUrl = oldUrl.replace(/(.*)?(\/)(.*)/g, function (item, $1, $2, $3) {
      return $1 + $2 + $3 + (/[?]/.test($3) ? '&' : '?') + updateKey + '=' + updateValue
    })
    res = newUrl !== oldUrl ? newUrl : res
  }

  res = res.replace(/\?[?&]+/g, '?')
  res = res.replace(/&+/g, '&')
  res = res.replace(/\?+$/g, '')
  res = res.replace(/\?+#/g, '#') // 微信公众号分享，如果hash路由前面带了参数，会认为不合法
  
  return res
}


module.exports = updateQuery