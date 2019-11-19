const isArray = require('./isArray')
const forEach = require('./forEach')
const trim = require('./trim')
const _String = require('./_String')

/**
 * 修改元素 className, 没有就添加
 * @param {object} el dom元素 
 * @param {String || Array} oldVal 要修改的className
 * @param {String || Array} newVal 修改对应索引的值，为空则替换
 */

function updateClass (el, oldVal, newVal) {
  var className = el.className, exitMap = {};
  oldVal = isArray(oldVal) ? oldVal : [oldVal]
  newVal = isArray(newVal) ? newVal : [newVal]
  var findOne, oneNewName;

  // 去重
  for(var a = newVal.length - 1; a >= 0; a--) {
    if(!exitMap[newVal[a]]) {
      exitMap[newVal[a]] = true
    } else {
      newVal[a] = ''
    }
  }
  
  forEach(oldVal, function (item, index) {
    findOne = false
    oneNewName = _String(newVal[index])
    className = className.replace(new RegExp('(\\s|^)' + trim(item) + '(\\s|$)'), function (nouse, $1, $2) {
      findOne = true
      return $1 + oneNewName + $2
    })

    if(!findOne) {
      className += ' ' + oneNewName
    }
  })

  // 去除多余空格
  className = trim(className.replace(/\s+/g, ' '))
  
  if (className !==el.className) {
    el.className = className
    return true
  }
}

module.exports = updateClass