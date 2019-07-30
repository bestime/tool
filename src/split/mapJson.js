
const _Object = require('./_Object')
const clone = require('./clone')

function mapJson (obj, handle) {
  obj = _Object(obj)
  var res = []
  var index = 0
  for(var key in obj) {
    res.push(clone(handle(obj[key], key, index++)))
  }
  return res
}

module.exports = mapJson