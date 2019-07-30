
const each = require('./each')
const clone = require('./clone')


function map (arr, handle) {
  let res = []
  each(arr, function (item, index) {
    res.push(clone(handle(item, index)))
  })
  return res
}

module.exports = map