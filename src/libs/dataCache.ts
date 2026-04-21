
import hpJsonParse from './help/hpJsonParse'
import variableHasValue from './variableHasValue'

/** 数据缓存工具提供的方法 */
interface IdataCacheCAllback {
  /** 检查对应url是否已经有缓存标记 */
  isExist: () => boolean;
  /**
   * 为对应url设置缓存树
   * @param data - 缓存的数据
   */
  set: (data: any) => void;
  /**
   * 获取缓存数据
   * @param success - 回调函数
   */
  get: (success: (data: any) => void) => void;

  /**
   * 重置缓存数据为初始状态
   */
  clear: () => void

  run: () => void

  logs: Record<string, any>
}

const _defaultRecord: Record<string, any> = {}



/**
* @deprecated 慎用
* 对相同地址的数据进行缓存
* @param url - 请求地址
* @returns 处理工具
*/
export default function dataCache (url: string, record?: Record<string, any>):IdataCacheCAllback {
  const _tmp = record || _defaultRecord
  
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
      callback(hpJsonParse(item.data))
    }, 100)
  }

  function clear () {
    _tmp[url].count = 0
    _tmp[url].complete = false
    _tmp[url].data = null
  }

  return {
    isExist: isStart,
    set: setData,
    get: getData,
    clear,
    logs: _tmp,
    run: function () {
      _tmp[url].count++
    }
  }
  
}