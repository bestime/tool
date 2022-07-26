interface urlConvertConfig {
  [key: string]: string | null
}

interface CacheData {
  [key: string]: {
    to: string | null,
    reg: RegExp
  }
}



export default function serverConfig (config: urlConvertConfig) {
  
  let _cache: CacheData = {};
  let toPath: string | null;
  for(let fromPath in config) {
    toPath = config[fromPath]
    _cache[fromPath] = {
      to: toPath,
      reg: new RegExp('^(' + fromPath + ')(/|$)')
    }
  }

  return function (path: string) {
    let success = false
    var result = path
    
    for(let fromPath in _cache) {
      const item = _cache[fromPath]
      if (item.reg.test(path)) {
        success = true
        if(typeof item.to === 'string') {
          result = path.replace(item.reg, item.to + '$2')
        }
        break;
      }
    }

    if(!success) {
      console.error('警告：请求地址 "' + path + '" 不在白名单中！')
      console.table(_cache)
    }

    // console.log('url转换结果', path, '=>', result)

    return result
  }
}





