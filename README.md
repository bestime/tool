#### Array.$forEach(handle) 可跳出循环的遍历
```javascript
[1, 2, 3].$forEach((item, index, source) => {
  if(item===2) {
    return 'break';
  } else if(item===1) {
    return 'continue';
  } else {
    console.log(item)
  }
})
```
-------
#### Array.$map(handle)
#### Array.$filter(handle)
#### Array.$some(handle)
#### Array.$find(handle)
#### Array.$indexOf(handle)
#### Array.$reduce(handle)
#### Object.$map
#### String.$trim

-------
#### bestime.getQuery(String | null)
#### bestime.drag(opt)
#### bestime.dialog(opt)
#### bestime.loading(opt)
#### bestime.Pager(opt)
#### bestime.Progress(opt)
#### bestime.throttle(handle, delay, isFirstWork)
#### bestime.debounce(handle, delay, isFirstWork)
#### bestime.FunctionOnce(handle)
#### bestime.FunctionLoop(opt)
#### bestime.onDomRoll(el, opt)
#### bestime.Parabola(opt)

-------
#### bestime.defaultType(type, data)
#### bestime._Array(data) 强制转换为 Array
#### bestime._Boolean(data) 强制转换为 Boolean
#### bestime._Function(data) 强制转换为 Function
#### bestime._Number(data) 强制转换为 数字
#### bestime._Object(data) 强制转换为 Json
#### bestime._String(data) 强制转换为 String

-------
#### bestime.isArray(data)
#### bestime.isEmpty(data)
#### bestime.isFunction(data)
#### bestime.isNumber(data)
#### bestime.isObject(data)
#### bestime.isPhone(data)
#### bestime.isString(data)


-------
#### bestime.addClass(el, className)
#### bestime.toggleClass(el, className)
#### bestime.average(section, num, decimal)
#### bestime.clone(data)
#### bestime.createUUID()
#### bestime.mouseWheel(el, callback, isPrevent)
#### bestime.thousands(data)
#### bestime.getJsPath()
#### bestime.getRandom()
#### bestime.getWindowSize()
#### bestime.prevent(e)
#### bestime.getNowTime()
#### bestime.clear(data)

