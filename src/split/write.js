const updateQuery = require('./updateQuery')
const isObject = require('./isObject')
const stamp = +new Date
const charset = 'charset="UTF-8"'

/**
 * 用于加载一些需要处理缓存的资源文件,
 * 
 * @param {String} type 资源类型，仅支持：[style, script]
 * @param {String} path 文件路径
 * @param {Boolean} hash 是否需要随机值 
 */
function write (type, path, hash) {
  if(type && path) {
    var str = ''
    if(hash === true) {
      path = updateQuery('t', stamp, path)
    } else if(typeof hash === 'string') {
      path = updateQuery('t', hash, path)
    } else if(isObject(hash)) {
      for(var key in hash) {
        path = updateQuery(key, hash[key], path)
      }
    }
    if(type==='style') {
      str = '<link href="'+ path +'" rel="stylesheet" '+ charset +'\/>'
    } else if(type==='script') {
      str = '<'+type+' src="'+ path +'" type="text\/javascript" '+ charset +'><\/'+type+'>'
    }
    str && document.write(str)
  }
}

module.exports = write