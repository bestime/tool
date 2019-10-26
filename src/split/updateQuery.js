/**
 * 更新序列化字符串参数，如果字段不存在，则新增字段
 * @param {String} updateKey 更新字段
 * @param {?:String} updateValue 更新值
 * @param {?:String} 需要更新的字符串 默认为window.location.href
 */

function updateQuery (updateKey, updateValue, str) {
  updateValue = encodeURI(updateValue)
  var href = '', isfind, oldUrl;
  try { href = window.location.href } catch (e) {};
  oldUrl = typeof str === 'string' ? str : href 
  // 尝试修改旧参数
  var res = oldUrl.replace(new RegExp('([?&]'+ updateKey +'=)([^=&?/#]*)', 'g'), function (g, $1) {
    isfind = true
    return $1 + updateValue
  })

  // 追加新参数
  if(!isfind) {
    var newUrl = oldUrl.replace(/(.*)?(\/)(.*)/g, function (item, $1, $2, $3) {
      return $1 + $2 + $3 + (/[?]/.test($3) ? '&' : '?') + updateKey + '=' + updateValue
    })
    res = newUrl !== oldUrl ? newUrl : res
  }
  
  return res
}


module.exports = updateQuery