/**
 * url白名单配置入口，数据格式为键值对。如果没在白名单内的url，将会提示错误！
 * 键：表示前缀
 * 值：表示将将前缀替换为指定的字符串（为空则不替换）
 * 
 * @return function (url) => realUrl
 * 
 * @example
 * const resolveServerUrl = createServerUrl({
 *   '/api': '/@api',
 *   '/bestime': null,
 *   'http': 'https'
 * })
 * 
 * const url01 = resolveServerUrl('/api/list/page')
 * 
 */

 export default function createServerUrl (config) {
  var item;
  var fromPath;
  var toPath;
  var success = false
  for(fromPath in config) {
    toPath = config[fromPath]
    config[fromPath] = {
      to: toPath,
      reg: new RegExp('^' + fromPath + '(\\b|$)')
    }
  }


  return function (path) {
    success = false
    var result = path
    
    for(fromPath in config) {
      item = config[fromPath]
      if (item.reg.test(path)) {
        success = true
        if(typeof item.to === 'string') {
          result = path.replace(item.reg, item.to)
        }
        break;
      }
    }

    if(!success) {
      console.error('警告：请求地址 "' + path + '" 不在白名单中！')
      console.table(config)
    }

    // console.log('url转换结果', path, '=>', result)

    return result
  }
}