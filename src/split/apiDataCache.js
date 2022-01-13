import urlToGet from './urlToGet'
import dataReady from './dataReady'
var CACHE_MAPS_NAME = '__api_data_cache_map'


/**
 * 缓存相同请求地址的数据
 * 参数参考Jquery.axax
 * @param {String} options.url
 * @param {Object} [options.data=null]
 */
export default function apiDataCache (options) {
  window[CACHE_MAPS_NAME] = window[CACHE_MAPS_NAME] || {}
  
  var url = options.url
  var data = options.data
  const tmpUrl = urlToGet(url, data)
  
  
  window[CACHE_MAPS_NAME][tmpUrl] = window[CACHE_MAPS_NAME][tmpUrl] || {
    count: 0, // 第几次
    complete: false, // 是否完成
    data: null, // 数据
  }

  const item = window[CACHE_MAPS_NAME][tmpUrl]
  item.count++


  /** 这个链接的请求是否已经开始 */
  function isStart () {
    return item.count > 1
  }

  /** 对相同请求设置数据 */
  function setData (data) {
    item.complete = true
    item.data = JSON.stringify(data)
  }

  /** 获取数据 */
  async function getData () {
    await dataReady(function () {
      return item.complete
    })
    return JSON.parse(item.data)
  }

  return {
    isStart: isStart,
    setData: setData,
    getData: getData
  }
  
}