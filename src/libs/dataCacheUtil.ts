
import variableHasValue from './variableHasValue'

const _tmp: {
  [key: string]: any
} = {}




/**
 * 缓存相同请求地址的数据
 * 参数参考Jquery.axax
 * @param {String} options.url
 * @param {Object} [options.data=null]
 */
export default function dataCacheUtil (url: string) {
  
  
  _tmp[url] = _tmp[url] || {
    count: 0, // 第几次
    complete: false, // 是否完成
    data: null, // 数据
  }

  const item = _tmp[url]
  item.count++


  /** 这个链接的请求是否已经开始 */
  function isStart () {
    return item.count > 1
  }

  /** 对相同请求设置数据 */
  function setData (data: any) {
    item.complete = true
    item.data = JSON.stringify(data)
  }

  /** 获取数据 */
  function getData (callback: (data: any) => void) {
    variableHasValue(function () {
      return item.complete
    }, function () {
      callback(JSON.parse(item.data))
    }, 100)
  }

  return {
    isExist: isStart,
    set: setData,
    get: getData
  }
  
}