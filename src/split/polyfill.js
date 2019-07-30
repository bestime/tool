const clone = require('./clone')
const getType = require('./getType')
const trim = require('./trim')
const isFunction = require('./isFunction')

Array.prototype.$forEach = function (handle) {
  if(!isFunction(handle)) return;
  var res;
  for(var a=0, len = this.length; a < len; a++) {
    res = handle(this[a], a, this)
    if(res === 'break') {
      break;
    } else if (res === 'continue') {
      continue;
    }
  }
}

// map 需要拷贝生成新数组
Array.prototype.$map = function (handle) {
  if(!isFunction(handle)) return;
  var res = []
  for(var a=0, len = this.length; a < len; a++) {
    res.push(handle(clone(this[a]), a, this))
  }
  return res
}

Array.prototype.$filter = function (handle) {
  if(!isFunction(handle)) return;
  var res = []
  for(var a=0, len = this.length; a < len; a++) {
    handle(this[a], a, this) && res.push(this[a])
  }
  return res
}

Array.prototype.$some = function (handle) {
  if(!isFunction(handle)) return;
  var res = false
  for(var a=0, len = this.length; a < len; a++) {
    if(handle(this[a], a, this)) {
      res = true
      break;
    }
  }
  return res
}

Array.prototype.$find = function (handle) {
  if(!isFunction(handle)) return;
  var res;
  for(var a=0, len = this.length; a < len; a++) {
    if(handle(this[a], a, this)) {
      res = this[a]
    }
  }
  return res
}

Array.prototype.$indexOf = function (data) {
  var index = 0, len=this.length, findIndex = -1;
  while (index < len) {
    if(this[index]===data) {
      findIndex = index
      break;
    }
    index++
  }
  return findIndex
}

Array.prototype.$reduce = function (handle, initVal) {
  if(!isFunction(handle)) return;
  var res =  '', index = 0, len = this.length;
  if(typeof initVal !== 'undefined' && initVal !== null) {
    res = initVal
    index = 1
  }
  while (index < len) {
    res = handle(res, this[index])
    index++
  }
  return res
}

Object.$map = function (data, handle) {
  if(!isFunction(handle) || getType(data) !== 'Object') return;
  var res = [], key;
  for(key in data) {
    res.push(handle(clone(data[key]), key))
  }
  return res
}

String.prototype.$trim = function () {
  return trim(this)
}