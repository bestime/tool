
const _Object = require('./_Object')
const _Function = require('./_Function')

/**
 * 
 * @param {Object} opt 配置json
 *  @key {Function} opt.handle 主函数
 *  @key {Function} opt.onFast 操作过快函数
 */

function FunctionConfirm (opt) {
  opt = _Object(opt)
  let lock = false
  return function () {
    let args = [
      function () {
        lock = false
      }
    ]

    for(let a=0; a<arguments.length; a++) {
      args.push(arguments[a])
    }

    if(lock) {
      _Function(opt.onFast).apply(this, args);
    } else {
      lock = true
      _Function(opt.handle).apply(this, args)
    }
  }
}

module.exports = FunctionConfirm