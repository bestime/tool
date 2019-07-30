// 存放其他插件使用的数据
const _Object = require('./_Object')

function getData () {
  window.jcy = _Object(window.jcy)
  return window.jcy
}

module.exports = getData