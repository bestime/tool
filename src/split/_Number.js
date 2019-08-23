/**
 * 强制转数字，转换失败就为0
 * 
 */


function _Number(data) {
  var res = Number(data)
  res = res === Infinity || /e/g.test(res) || isNaN(res) ? 0 : res
  return res
}


/*



_Number('+1.25')
_Number('-1.25')
_Number(0)
_Number('')
_Number(false)
_Number(true)
_Number({})
_Number('0')
_Number([])
_Number(function () {})
_Number(/abc/)
_Number(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999)
_Number(0/1)
_Number(1/0)



*/

module.exports = _Number