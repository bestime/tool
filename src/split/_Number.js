
/**
 * 
 * @param {*} data 需要转换的数据
 * @param {Boolean} canEmpty 是否允许空，处理input输入内容转数字时候可以用到
 * @return {Number || String}
 */
function _Number (data, canEmpty) {
  var res = Number(data);
  var errorValue = 0
  if (canEmpty) {
    if (data === '' || typeof data === 'undefined') {
      res = ''
      errorValue = ''
    }
  }
  return res === Infinity || /e/g.test(res) || isNaN(res) ? errorValue : res
}

/*


_Number('+1.25.36')
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

_Number(0/1)
_Number(1/0)

_Number(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999)

_Number('张胜男1啊3二维4')
_Number('2.张胜男1啊3二维4')



*/

module.exports = _Number