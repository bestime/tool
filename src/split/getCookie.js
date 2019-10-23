const FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')
//获取cookie
function getCookie (key) {
  var res;
  document.cookie.replace(new RegExp(key + '=(.*?)($|(; ))'), function (g, $1) {
    res = FN_FORMAT_STRING_VALUE(decodeURIComponent($1))
  })
  return res
}

module.exports = getCookie