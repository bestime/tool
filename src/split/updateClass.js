const isArray = require('./isArray')
const forEach = require('./forEach')
const trim = require('./trim')
const _String = require('./_String')

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} oldVal # 需要修改的className
 * @param {String || Array} newVal # 修改对应索引的值，为空则替换
 */
function updateClass (el, oldVal, newVal) {
  var res = el.className, exitMap = {};
  oldVal = isArray(oldVal) ? oldVal : [oldVal]
  newVal = isArray(newVal) ? newVal : [newVal]

  // 去重
  for(var a = newVal.length - 1; a >= 0; a--) {
    if(!exitMap[newVal[a]]) {
      exitMap[newVal[a]] = true
    } else {
      newVal[a] = ''
    }
  }
  
  forEach(oldVal, function (item, index) {
    res = res.replace(new RegExp('(\\s|^)' + trim(item) + '(\\s|$)'), '$1' + _String(newVal[index]) + '$2')
  })

  // 去除多余空格
  res = trim(res.replace(/\s{2,}/g, ' '))
  
  if (res !==el.className) {
    el.className = res
  }
}

module.exports = updateClass