const _Number = require('./_Number')

/**
 * 
 * @param {*} data 需要转换的数据
 * @param {Boolean} isDecimals 是否小数，如果不是，将自动移除小数点
 * @return {Number || String}
 */
function symbolNumber (data, isDecimals) {
  isDecimals = isDecimals === false ? false : true
  var res = data
  
  if(typeof data !== 'number') {
    var str = data
    str = String(str).trim()
    var pre = str.substr(0, 1)
    pre = /[0-9+-.]/.test(pre) ? pre : ''; // 保留正负符号
    var hou = str.substring(1)
    // 清空第一个点后后面的点和所有的非数字字符
    if(/\./.test(hou)) {
      hou = hou.replace(/[^0-9.]+/, '').replace(/\..*/, dot => {
        return '.' + dot.replace(/[^0-9]/g, '')
      })
    } else {
      hou = hou.replace(/[^0-9]/g, '')
    }
    res = pre + hou
  } else {
    res = _Number(data, true)
  }

  if(!isDecimals) {
    res = res.replace(/\./g, '')
  }
  
  console.log('结果：', res,'  值：', data)
  return res
}


/*



symbolNumber('+')
symbolNumber('-')
symbolNumber('.')
symbolNumber('.5')
symbolNumber('+1.25.36')
symbolNumber('-1.25')
symbolNumber(0)
symbolNumber('')
symbolNumber(false)
symbolNumber(true)
symbolNumber({})
symbolNumber('0')
symbolNumber([])
symbolNumber(function () {})
symbolNumber(/abc/)

symbolNumber(0/1)
symbolNumber(1/0)

symbolNumber(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999)

symbolNumber('张胜男1啊3二维4')
symbolNumber('2.张胜男1啊3二维4')



*/

module.exports = symbolNumber