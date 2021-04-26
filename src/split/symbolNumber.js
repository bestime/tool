import _Number from './_Number'
import trim from './trim'
import isEmpty from './isEmpty'

import { TYPE_NUMBER } from './basic/constant'

/**
 * @description 多用于表单数字输入处理可为 【空字符，正，负】情况下
 * @param {*} data 需要转换的数据
 * @param {Boolean} [isDecimals=true] 默认true, 是否小数，如果不是，将自动移除小数点
 * @return {Number|String}
 */
export default function symbolNumber (data, isDecimals) {
  var res = data
  if(isEmpty(data)) {
    res = data
  } else if(typeof data === TYPE_NUMBER) {
    res = _Number(data, true)
  } else {
    var str = trim(data)
    var pre = str.substr(0, 1)
    pre = /[0-9+-.]/.test(pre) ? pre : ''; // 保留正负符号
    var hou = str.substring(1)
    // 清空第一个点后面的点和所有的非数字字符
    if(/\./.test(hou)) {
      hou = hou.replace(/[^0-9.]+/, '').replace(/\..*/, function (dot) {
        return '.' + dot.replace(/[^0-9]/g, '')
      })
    } else {
      hou = hou.replace(/[^0-9]/g, '')
    }
    res = pre + hou
  }

  if (isDecimals === false) {
    res = res.replace(/\./g, '')
  }
  
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

