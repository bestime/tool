const updateQuery = require('./updateQuery')
const stamp = +new Date
const charset = 'charset="UTF-8"'

/**
 * 用于加载一些需要处理缓存的资源文件
 * 
 * @param {String} type 资源类型，仅支持：[style, script]
 * @param {String} path 文件路径
 * @param {Boolean} hash 是否需要随机值 
 */
function write (type, path, hash) {
  if(type && path) {
    var str = ''
    if(hash) {
      path = updateQuery('t', hash === true ? stamp : hash, path)
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