const clone = require('./clone')
const isArray = require('./isArray')

function isEqualArray (one, two, handle) {
  var res = false
  if(isArray(one) && isArray(two)) {
    if(!one.length && !two.length) {
      res = true
    } else if(one.length === two.length) {
      handle = typeof handle === 'function' ? handle : false
      one = clone(one)
      two = clone(two)
      var v1, v2;
      for (var a = one.length - 1; a >= 0 ; a--) {
        for (var b = two.length - 1; b >= 0; b--) {
          v1 = one[a]
          v2 = two[b]
          if(handle) {
            v1 = handle(v1)
            v2 = handle(v2)
          }
          if(v1 === v2) {
            one.splice(a, 1)
            two.splice(b, 1)
            break;
          }
        }
      }
      res = !one.length && !two.length
    }
  }
  return res
}

module.exports = isEqualArray